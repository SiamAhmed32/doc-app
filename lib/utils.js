const doctorImages = [
  "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/5327653/pexels-photo-5327653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/4989136/pexels-photo-4989136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/5214993/pexels-photo-5214993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

export const getDoctorImage = (doctorId) => {
  if (!doctorId) return doctorImages[0];
  const index = parseInt(String(doctorId).slice(-1), 16) % doctorImages.length;
  return doctorImages[index];
};
