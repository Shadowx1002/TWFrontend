import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaPlane, FaBoxOpen, FaCar, FaPlusCircle, FaTrash, FaImage, FaListUl } from 'react-icons/fa';
import { Plus, Clock, CheckCircle, XCircle, Users, Map as MapIcon, Mail } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('inquiries'); 
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  // Manage Data State
  const [existingTours, setExistingTours] = useState([]);
  const [inquiries, setInquiries] = useState([]);

  // Main Form State
  const [formData, setFormData] = useState({
    // Tour
    name: '', duration: '', price: '', summary: '', highlights: '', 
    description: '', maxGroupSize: '', difficulty: 'medium', startLocation: '', startDates: '',
    // Package
    title: '', days: '', features: '',
    // Vehicle
    type: '', model: '', capacity: ''
  });

  // Files for Main Cover/Gallery
  const [imageFiles, setImageFiles] = useState([]);

  // Timeline State for Tours
  const [timeline, setTimeline] = useState([
    { day: 1, title: '', description: '', stops: [] }
  ]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5005';

  // --- 1. FETCH & MANAGE DATA LOGIC ---
  useEffect(() => {
    if (activeTab === 'manage') {
      fetchTours();
    } else if (activeTab === 'inquiries') {
      fetchInquiries();
    }
  }, [activeTab]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/tours`);
      setExistingTours(res.data.data ? res.data.data.tours : res.data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to fetch tours");
      setLoading(false);
    }
  };

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/planner/all`);
      setInquiries(res.data);
      setLoading(false);
    } catch (err) { 
      toast.error("Error fetching inquiries");
      setLoading(false);
    }
  };

  const handleDeleteTour = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this tour?")) return;
    try {
      await axios.delete(`${backendUrl}/api/tours/${id}`);
      toast.success("Tour deleted successfully");
      fetchTours(); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete tour");
    }
  };

  const updateInquiryStatus = async (id, status) => {
    try {
      await axios.put(`${backendUrl}/api/planner/${id}`, { status });
      setInquiries(inquiries.map(q => q._id === id ? { ...q, status } : q));
      toast.success(`Inquiry marked as ${status}`);
    } catch (err) { 
      toast.error("Failed to update status"); 
    }
  };

  // --- 2. FORM INPUT HANDLERS ---
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    if (e.target.files) setImageFiles(Array.from(e.target.files));
  };

  // --- 3. TIMELINE BUILDER FUNCTIONS ---
  const addDay = () => setTimeline([...timeline, { day: timeline.length + 1, title: '', description: '', stops: [] }]);
  
  const removeDay = (index) => {
    const newTimeline = timeline.filter((_, i) => i !== index);
    const reIndexed = newTimeline.map((item, i) => ({ ...item, day: i + 1 }));
    setTimeline(reIndexed);
  };

  const updateDay = (index, field, value) => {
    const newTimeline = [...timeline];
    newTimeline[index][field] = value;
    setTimeline(newTimeline);
  };

  const addStop = (dayIndex) => {
    const newTimeline = [...timeline];
    newTimeline[dayIndex].stops.push({ name: '', type: 'Attraction', description: '', image: '' });
    setTimeline(newTimeline);
  };

  const removeStop = (dayIndex, stopIndex) => {
    const newTimeline = [...timeline];
    newTimeline[dayIndex].stops = newTimeline[dayIndex].stops.filter((_, i) => i !== stopIndex);
    setTimeline(newTimeline);
  };

  const updateStop = (dayIndex, stopIndex, field, value) => {
    const newTimeline = [...timeline];
    newTimeline[dayIndex].stops[stopIndex][field] = value;
    setTimeline(newTimeline);
  };

  const handleStopImageUpload = async (e, dayIndex, stopIndex) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      toast.loading("Uploading stop image...", { id: 'uploadStop' });
      const fileName = `stop-${Date.now()}-${file.name.replace(/\s/g, '-')}`;
      
      const { error } = await supabase.storage.from('tour-images').upload(fileName, file);
      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage.from('tour-images').getPublicUrl(fileName);
      updateStop(dayIndex, stopIndex, 'image', publicUrl);
      toast.success("Image added!", { id: 'uploadStop' });
    } catch (err) {
      console.error(err);
      toast.error("Upload failed", { id: 'uploadStop' });
    }
  };

  // --- 4. MAIN SUBMIT LOGIC ---
  const uploadImagesToSupabase = async (files) => {
    try {
      setUploading(true);
      const uploadPromises = files.map(async (file) => {
        const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
        const { error } = await supabase.storage.from('tour-images').upload(fileName, file);
        if (error) throw error;
        const { data: { publicUrl } } = supabase.storage.from('tour-images').getPublicUrl(fileName);
        return publicUrl;
      });
      return await Promise.all(uploadPromises);
    } catch (error) {
      toast.error("Image upload failed! Please check your Supabase bucket.");
      console.error(error);
      return [];
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let imageUrls = [];
      if (imageFiles.length > 0) {
        imageUrls = await uploadImagesToSupabase(imageFiles);
        if (imageUrls.length === 0) {
           setLoading(false);
           return;
        }
      } else {
        throw new Error("Please upload at least one main image");
      }

      if (activeTab === 'tour') {
        const highlightsArray = formData.highlights ? formData.highlights.split(',').map(h => h.trim()).filter(Boolean) : [];
        
        const startDatesArray = formData.startDates 
          ? formData.startDates.split(',')
              .map(d => d.trim())
              .filter(d => d !== '' && !isNaN(Date.parse(d))) 
          : [];

        // CRITICAL FIX: Mapping the payload keys to match the Mongoose Backend exactly
        const tourPayload = {
          name: formData.name.trim(),
          title: formData.name.trim(), // Sent as title to satisfy Mongoose
          duration: parseInt(formData.duration) || 1,
          days: parseInt(formData.duration) || 1, // Fallback for days
          price: parseFloat(formData.price) || 0,
          summary: formData.summary,
          description: formData.description,
          imageCover: imageUrls[0],
          image: imageUrls[0], // Sent as image to satisfy Mongoose
          images: imageUrls.slice(1),
          highlights: highlightsArray,
          difficulty: formData.difficulty,
          maxGroupSize: parseInt(formData.maxGroupSize) || 1,
          location: formData.startLocation || 'Colombo', // Sent as simple string for Mongoose
          startLocation: { // Kept just in case
            type: 'Point', 
            description: formData.startLocation || 'Colombo',
            coordinates: [79.8612, 6.9271] 
          },
          startDates: startDatesArray,
          timeline: timeline
        };

        console.log("🚀 Sending Tour Data to Database:", tourPayload);

        await axios.post(`${backendUrl}/api/tours`, tourPayload);
        toast.success('Tour Created Successfully!');

      } else if (activeTab === 'package') {
        const featuresArray = formData.features ? formData.features.split(',').map(f => f.trim()).filter(Boolean) : [];
        await axios.post(`${backendUrl}/api/packages`, {
          title: formData.title,
          days: Number(formData.days),
          price: Number(formData.price),
          image: imageUrls[0],
          description: formData.description,
          features: featuresArray
        });
        toast.success('Package Created Successfully!');

      } else if (activeTab === 'vehicle') {
        const featuresArray = formData.features ? formData.features.split(',').map(f => f.trim()).filter(Boolean) : [];
        await axios.post(`${backendUrl}/api/vehicles`, {
          type: formData.type,
          model: formData.model,
          capacity: Number(formData.capacity),
          image: imageUrls[0],
          features: featuresArray
        });
        toast.success('Vehicle Added Successfully!');
      }
      
      window.location.reload(); 
      
    } catch (err) {
      console.error("❌ Backend Error Response:", err.response?.data);
      
      const errorMsg = err.response?.data?.message || err.message;
      
      if (errorMsg.includes("duplicate key") || errorMsg.includes("E11000")) {
         toast.error("Error: A tour with this Name already exists! Please pick a new name.");
      } else if (errorMsg.includes("Cast to Date failed")) {
         toast.error("Error: Invalid Date Format. Please use YYYY-MM-DD.");
      } else {
         toast.error(errorMsg); // This will show any remaining validation errors!
      }
    } finally {
      setLoading(false);
    }
  };

  // Stats Data for Inquiries Tab
  const stats = [
    { label: 'Total Requests', value: inquiries.length, icon: <Users size={20}/>, bgClass: 'bg-blue-500/10', textClass: 'text-blue-500' },
    { label: 'Pending', value: inquiries.filter(i => i.status === 'pending').length, icon: <Clock size={20}/>, bgClass: 'bg-amber-500/10', textClass: 'text-amber-500' },
    { label: 'Approved', value: inquiries.filter(i => i.status === 'approved').length, icon: <CheckCircle size={20}/>, bgClass: 'bg-emerald-500/10', textClass: 'text-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8 lg:p-12 text-white font-sans">
      <div className="max-w-7xl mx-auto bg-white/5 rounded-[3rem] shadow-2xl overflow-hidden border border-white/10 backdrop-blur-xl">
        
        {/* --- HEADER & NAVIGATION --- */}
        <div className="bg-black/50 p-8 md:p-10 border-b border-white/10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-2">Command Center</h1>
            <p className="text-white/40 text-xs font-bold tracking-[0.2em] uppercase">Business Operations Dashboard</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              { id: 'inquiries', label: 'Guest Inquiries', icon: <Mail size={16} /> },
              { id: 'manage', label: 'Manage Tours', icon: <FaListUl /> },
              { id: 'tour', label: 'Add Tour', icon: <FaPlane /> },
              { id: 'package', label: 'Add Package', icon: <FaBoxOpen /> },
              { id: 'vehicle', label: 'Add Vehicle', icon: <FaCar /> }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-500' 
                    : 'bg-white/5 hover:bg-white/10 text-white/70 border border-transparent'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="p-6 md:p-10 lg:p-12">

          {/* 1. GUEST INQUIRIES TAB */}
          {activeTab === 'inquiries' && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {stats.map((s, idx) => (
                  <div key={idx} className="bg-black/40 border border-white/10 p-6 rounded-[2rem] flex items-center justify-between hover:bg-white/5 transition-colors">
                    <div>
                      <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest mb-1">{s.label}</p>
                      <p className="text-4xl font-black text-white">{s.value}</p>
                    </div>
                    <div className={`p-4 rounded-2xl ${s.bgClass} ${s.textClass}`}>
                      {s.icon}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-black/40 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
                  <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter">Recent Inquiries</h3>
                  <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest hidden md:block flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Sync
                  </span>
                </div>

                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>
                  ) : (
                    <table className="w-full text-left min-w-[800px] md:min-w-full">
                      <thead className="bg-white/5 text-white/30 text-[10px] uppercase tracking-[0.2em] font-black border-b border-white/10">
                        <tr>
                          <th className="px-8 py-5">Client Info</th>
                          <th className="px-8 py-5">Travel Plan</th>
                          <th className="px-8 py-5">Status</th>
                          <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {inquiries.length === 0 ? (
                          <tr><td colSpan="4" className="p-20 text-center text-white/20 font-bold uppercase tracking-widest">No inquiries found yet</td></tr>
                        ) : (
                          inquiries.map((q) => (
                            <tr key={q._id} className="group hover:bg-white/5 transition-all">
                              <td className="px-8 py-6">
                                <p className="text-white font-bold">{q.fullName}</p>
                                <div className="flex items-center gap-2 text-white/50 text-xs mt-1">
                                  <Mail size={12}/> {q.email}
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest">
                                  <MapIcon size={14}/> {q.arrivalDate} — {q.departureDate}
                                </div>
                                <p className="text-white/50 text-[10px] mt-1 uppercase font-bold tracking-widest">{q.country} • {q.pax} Pax</p>
                              </td>
                              <td className="px-8 py-6">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                  q.status === 'pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' :
                                  q.status === 'approved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 
                                  'bg-red-500/10 border-red-500/20 text-red-500'
                                }`}>
                                  {q.status}
                                </span>
                              </td>
                              <td className="px-8 py-6 text-right">
                                <div className="flex justify-end gap-2">
                                  <button 
                                    onClick={() => updateInquiryStatus(q._id, 'approved')}
                                    className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-lg border border-emerald-500/20"
                                    title="Approve"
                                  >
                                    <CheckCircle size={18}/>
                                  </button>
                                  <button 
                                    onClick={() => updateInquiryStatus(q._id, 'rejected')}
                                    className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg border border-red-500/20"
                                    title="Reject"
                                  >
                                    <XCircle size={18}/>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. MANAGE DATA TAB */}
          {activeTab === 'manage' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-8 flex items-center gap-3">
                <div className="w-2 h-8 bg-blue-500 rounded-full"></div> All Tours Database
              </h2>
              
              {loading ? (
                <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>
              ) : (
                <div className="bg-black/40 rounded-[2.5rem] border border-white/10 overflow-x-auto shadow-2xl">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead className="bg-white/5">
                      <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-white/40">
                        <th className="p-6 font-bold">Image</th>
                        <th className="p-6 font-bold">Tour Name</th>
                        <th className="p-6 font-bold">Duration</th>
                        <th className="p-6 font-bold">Price</th>
                        <th className="p-6 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {existingTours.length === 0 && (
                        <tr><td colSpan="5" className="p-8 text-center text-white/40">No tours found in database.</td></tr>
                      )}
                      {existingTours.map(tour => (
                        <tr key={tour._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <img src={tour.image || tour.imageCover} alt={tour.title || tour.name} className="w-16 h-12 object-cover rounded-xl border border-white/10" />
                          </td>
                          <td className="p-4 font-bold text-sm tracking-tight">{tour.title || tour.name}</td>
                          <td className="p-4 text-white/60 text-xs font-bold uppercase tracking-widest">{tour.days || tour.duration} Days</td>
                          <td className="p-4 font-black text-emerald-400">${tour.price}</td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => handleDeleteTour(tour._id)}
                              className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white p-3 rounded-xl transition-colors border border-red-500/20"
                              title="Delete Tour"
                            >
                              <FaTrash size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* 3. FORMS (TOUR, PACKAGE, VEHICLE) */}
          {(activeTab === 'tour' || activeTab === 'package' || activeTab === 'vehicle') && (
            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto animate-fade-in">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-8 flex items-center gap-3 border-b border-white/10 pb-6">
                <div className={`w-2 h-8 rounded-full ${activeTab === 'tour' ? 'bg-emerald-500' : activeTab === 'package' ? 'bg-purple-500' : 'bg-amber-500'}`}></div> 
                Create New {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h2>
              
              <div className="border-2 border-dashed border-white/20 p-10 rounded-[2rem] bg-black/20 text-center hover:border-white/40 transition-colors group">
                 <FaImage className="mx-auto text-4xl text-white/20 group-hover:text-blue-500 transition-colors mb-4" />
                 <label className="block font-bold mb-2 uppercase tracking-widest text-sm">Upload Main Images</label>
                 <input type="file" multiple onChange={handleFileChange} required className="text-white/50 text-sm mt-4 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-blue-600 file:text-white hover:file:bg-blue-500 cursor-pointer" />
                 {imageFiles.length > 0 && <p className="text-xs text-emerald-400 mt-4 font-bold uppercase tracking-widest">{imageFiles.length} images selected</p>}
              </div>

              {/* --- TOUR FORM --- */}
              {activeTab === 'tour' && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input name="name" placeholder="Tour Name (e.g. The Ceylon Heritage)" value={formData.name} onChange={handleChange} className="bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-blue-500 outline-none transition" required />
                    <input name="duration" type="number" placeholder="Duration (Days)" value={formData.duration} onChange={handleChange} className="bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-blue-500 outline-none transition" required />
                    <input name="price" type="number" placeholder="Price ($)" value={formData.price} onChange={handleChange} className="bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-blue-500 outline-none transition" required />
                    <input name="maxGroupSize" type="number" placeholder="Max Group Size" value={formData.maxGroupSize} onChange={handleChange} className="bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-blue-500 outline-none transition" required />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <select name="difficulty" value={formData.difficulty} onChange={handleChange} className="bg-black/50 border border-white/10 p-4 rounded-xl text-white/70 focus:border-blue-500 outline-none transition" required>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="difficult">Difficult</option>
                    </select>
                    <input name="startLocation" placeholder="Start Location (e.g. Colombo)" value={formData.startLocation} onChange={handleChange} className="bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-blue-500 outline-none transition" required />
                  </div>

                  <input name="startDates" placeholder="Start Dates (2025-10-15, 2025-11-20)" value={formData.startDates} onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-blue-500 outline-none transition" />
                  <input name="highlights" placeholder="Highlights (Comma separated: Sigiriya, Yala, Beach)" value={formData.highlights} onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-blue-500 outline-none transition" required />
                  
                  <textarea name="summary" placeholder="Short Summary (For cards)" value={formData.summary} onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-blue-500 outline-none transition h-24" required />
                  <textarea name="description" placeholder="Full Detailed Description (For tour page)" value={formData.description} onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-blue-500 outline-none transition h-40" required />

                  {/* TIMELINE BUILDER */}
                  <div className="mt-12 bg-white/[0.02] border border-white/10 p-8 rounded-[2rem]">
                    <h2 className="text-xl font-black uppercase tracking-widest mb-6">Journey Timeline</h2>
                    {timeline.map((day, dayIndex) => (
                      <div key={dayIndex} className="bg-black/40 p-6 rounded-2xl border border-white/10 mb-6 relative">
                        <button type="button" onClick={() => removeDay(dayIndex)} className="absolute top-4 right-4 text-red-500/50 hover:text-red-500 transition">
                          <FaTrash />
                        </button>
                        <h3 className="font-bold text-lg mb-4 text-emerald-400 uppercase tracking-widest text-xs">Day {day.day}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <input placeholder="Day Title (e.g. Arrival in Colombo)" value={day.title} onChange={(e) => updateDay(dayIndex, 'title', e.target.value)} className="bg-white/5 border border-white/10 p-3 rounded-xl text-white text-sm outline-none focus:border-emerald-500" />
                          <input placeholder="Brief Day Description" value={day.description} onChange={(e) => updateDay(dayIndex, 'description', e.target.value)} className="bg-white/5 border border-white/10 p-3 rounded-xl text-white text-sm outline-none focus:border-emerald-500" />
                        </div>

                        {/* Stops Builder */}
                        <div className="pl-6 border-l-2 border-emerald-500/30 space-y-4">
                          <h4 className="font-bold text-white/40 uppercase tracking-widest text-[10px] mb-2">Stops / Attractions</h4>
                          {day.stops.map((stop, stopIndex) => (
                            <div key={stopIndex} className="bg-white/5 p-4 rounded-xl border border-white/10 relative">
                               <button type="button" onClick={() => removeStop(dayIndex, stopIndex)} className="absolute top-3 right-3 text-red-400/50 hover:text-red-400 transition text-sm">
                                 <FaTrash />
                               </button>
                               <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3 pr-8">
                                 <input placeholder="Place Name" value={stop.name} onChange={(e) => updateStop(dayIndex, stopIndex, 'name', e.target.value)} className="bg-black/50 border border-white/10 p-2 rounded-lg text-xs outline-none focus:border-emerald-500" />
                                 <select value={stop.type} onChange={(e) => updateStop(dayIndex, stopIndex, 'type', e.target.value)} className="bg-black/50 border border-white/10 p-2 rounded-lg text-xs outline-none focus:border-emerald-500 text-white/70">
                                   <option value="Attraction">Attraction</option>
                                   <option value="Hotel">Hotel</option>
                                   <option value="Restaurant">Restaurant</option>
                                   <option value="Activity">Activity</option>
                                 </select>
                                 <div className="relative overflow-hidden">
                                   {stop.image ? (
                                     <div className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest flex items-center h-full bg-emerald-400/10 px-3 rounded-lg border border-emerald-400/20">
                                       <FaImage className="mr-2"/> Uploaded
                                     </div>
                                   ) : (
                                     <input type="file" accept="image/*" onChange={(e) => handleStopImageUpload(e, dayIndex, stopIndex)} className="text-[10px] w-full text-white/50 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:bg-white/10 file:text-white hover:file:bg-white/20 cursor-pointer" />
                                   )}
                                 </div>
                               </div>
                               <input placeholder="Stop Description..." value={stop.description} onChange={(e) => updateStop(dayIndex, stopIndex, 'description', e.target.value)} className="w-full bg-black/50 border border-white/10 p-2 rounded-lg text-xs outline-none focus:border-emerald-500" />
                            </div>
                          ))}
                          <button type="button" onClick={() => addStop(dayIndex)} className="text-xs text-emerald-400 font-bold uppercase tracking-widest flex items-center mt-2 hover:text-emerald-300 transition">
                            <FaPlusCircle className="mr-2"/> Add Stop
                          </button>
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={addDay} className="w-full py-4 border-2 border-dashed border-white/20 text-white/50 rounded-2xl hover:bg-white/5 hover:border-emerald-500 hover:text-emerald-400 transition flex items-center justify-center font-bold uppercase tracking-widest text-xs">
                      <FaPlusCircle className="mr-2"/> Add Day {timeline.length + 1}
                    </button>
                  </div>
                </>
              )}

              {/* --- PACKAGE FORM --- */}
              {activeTab === 'package' && (
                <>
                  <input name="title" placeholder="Package Title" value={formData.title} onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-purple-500 outline-none transition" required />
                  <div className="grid grid-cols-2 gap-6">
                    <input name="days" type="number" placeholder="Days" value={formData.days} onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-purple-500 outline-none transition" required />
                    <input name="price" type="number" placeholder="Price ($)" value={formData.price} onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-purple-500 outline-none transition" required />
                  </div>
                  <input name="features" placeholder="Features (comma separated)" value={formData.features} onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-purple-500 outline-none transition" required />
                  <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-purple-500 outline-none transition h-32" required />
                </>
              )}

              {/* --- VEHICLE FORM --- */}
              {activeTab === 'vehicle' && (
                <>
                  <input name="model" placeholder="Vehicle Model (e.g. Toyota KDH)" value={formData.model} onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-amber-500 outline-none transition" required />
                  <div className="grid grid-cols-2 gap-6">
                    <input name="type" placeholder="Type (Van, Car, SUV)" value={formData.type} onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-amber-500 outline-none transition" required />
                    <input name="capacity" type="number" placeholder="Seat Capacity" value={formData.capacity} onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-amber-500 outline-none transition" required />
                  </div>
                  <input name="features" placeholder="Features (AC, Wifi)" value={formData.features} onChange={handleChange} className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:border-amber-500 outline-none transition" required />
                </>
              )}

              {/* --- SUBMIT BUTTON --- */}
              <button type="submit" disabled={loading || uploading} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-500 transition shadow-[0_0_30px_rgba(37,99,235,0.4)] mt-12 disabled:opacity-50 disabled:cursor-not-allowed">
                {uploading ? 'Uploading to Supabase...' : loading ? 'Processing...' : `Publish ${activeTab}`}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;