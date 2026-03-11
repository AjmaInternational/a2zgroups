import { useState } from "react";
import { supabase } from "../../lib/supabase";

const ImageUpload = ({ onUpload, currentImage }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    try {
      const files = e.target.files;
if (!files || files.length === 0) return;

      setUploading(true);

      // Create unique file name
     let uploadedUrls = [];

for (let file of files) {

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  uploadedUrls.push(data.publicUrl);
}

onUpload(uploadedUrls);


    } catch (error) {
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <label className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2 font-display">
        Product Image
      </label>

      <div className="flex items-center space-x-6">

        {/* Preview Box */}
        <div className="w-24 h-24 bg-slate-900 rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-center overflow-hidden">
          {currentImage ? (
            <img
              src={currentImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-primary text-xs">No Image</span>
          )}
        </div>

        {/* Upload Input */}
        <div className="flex-grow">
         <input
type="file"
accept="image/*"
multiple
            onChange={handleUpload}
            disabled={uploading}
            className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-primary/20 file:text-primary hover:file:bg-primary/30 transition-all cursor-pointer"
          />

          <p className="mt-2 text-[8px] font-bold text-slate-600 uppercase tracking-widest">
            {uploading
              ? "Uploading..."
              : "JPG, PNG, WEBP — Max 5MB"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;