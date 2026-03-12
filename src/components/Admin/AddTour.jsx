import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import { Upload, ArrowLeft, Image as ImageIcon, CheckCircle } from 'lucide-react';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

const AddTour = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({ title: '', location: '', price: '', duration: '', description: '' });
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image");
    setUploading(true);

    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage.from('tour-images').upload(fileName, file);
      if (error) throw error;

      const { data: urlData } = supabase.storage.from('tour-images').getPublicUrl(fileName);
      const imageUrl = urlData.publicUrl;

      await axios.post('http://localhost:5005/api/tours', { ...formData, image: imageUrl });
      alert("✅ Package Published Successfully!");
      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally { setUploading(false); }
  };

  const inputStyle = "w-full bg-white/5 border border-white/10 p-4 rounded-2xl text-white outline-none focus:border-blue-500 transition-all placeholder:text-white/20";

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition uppercase text-xs font-bold tracking-widest">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl">
          <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-10">
            Create <span className="text-blue-500">Package</span>
          </h2>

          <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Image Upload */}
            <div className="space-y-6">
              <div className="relative h-64 md:h-full min-h-[300px] border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden bg-black/40 group hover:border-blue-500/50 transition-all">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-6">
                    <ImageIcon className="mx-auto text-white/20 mb-4" size={48} />
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest">Select Package Image</p>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                />
              </div>
            </div>

            {/* Right Column: Details */}
            <div className="space-y-4">
              <input required type="text" placeholder="Package Title" className={inputStyle} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              
              <div className="grid grid-cols-2 gap-4">
                <input required type="text" placeholder="Location" className={inputStyle} onChange={(e) => setFormData({...formData, location: e.target.value})} />
                <input required type="text" placeholder="Duration (e.g. 5 Days)" className={inputStyle} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
              </div>

              <input required type="number" placeholder="Price (USD)" className={inputStyle} onChange={(e) => setFormData({...formData, price: e.target.value})} />
              
              <textarea required placeholder="Detailed Description..." className={`${inputStyle} h-40 resize-none`} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
              
              <button 
                type="submit" 
                disabled={uploading}
                className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black uppercase tracking-widest text-white shadow-xl shadow-blue-500/20 transition-all flex items-center justify-center gap-3"
              >
                {uploading ? "Processing..." : <><Upload size={20}/> Publish Package</>}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTour;