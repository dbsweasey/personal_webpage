export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer">
      © {currentYear} David Sweasey | All rights reserved
    </div>
  );
}
