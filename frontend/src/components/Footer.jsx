const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-6 text-center text-sm">
      © {new Date().getFullYear()} Doc
      <span className="text-indigo-500">Explo</span> — All Rights Reserved.
    </footer>
  );
}
export default Footer