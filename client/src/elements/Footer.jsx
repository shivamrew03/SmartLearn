function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="container mx-auto text-center">
          <p className="mb-2">&copy; 2024 EduPlatform. All rights reserved.</p>
          <p>
            <a href="/terms" className="mx-2 hover:underline">Terms of Service</a> | 
            <a href="/privacy" className="mx-2 hover:underline">Privacy Policy</a>
          </p>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  