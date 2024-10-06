export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 flex justify-center flex-wrap space-x-6 md:flex-row text-center text-xs md:text-lg p-1 bg-gray-100 text-black w-full">
      <div>
        &copy; {currentYear} Lawnbull Limited. All rights reserved.
      </div>
      <div>
        Contact us: +254-722-815-283 | kazibest@yahoo.com
      </div>
      <div>
        Location: Kenya, Nyeri, Kazi Building, along Kimathi Street
      </div>
    </footer>
  );
}
