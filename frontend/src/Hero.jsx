// App.jsx
// eslint-disable-next-line no-unused-vars
import React from "react";

import { Button } from "./components/ui/button";
import "./Hero.css";
import { WavyBackground } from "./components/ui/wavy-background";
// import HeroHeader from "./components/ui/heroHeader";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import bankBersinarLogo from "./assets/img/bank-bersinar-logo.png";
import solarPhone from "./assets/img/solar_phone-bold.png";
import linkedinLogo from "./assets/img/mdi_linkedin.png";
import instagramLogo from "./assets/img/mdi_instagram (1).png";

import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "solarPhone", src: solarPhone, href: "https://www.banksampahbersinar.com/" },
  { name: "linkedinLogo", src: linkedinLogo, href: "https://www.linkedin.com/company/pt-solusi-rahayu-indonesia-bank-sampah-bersinar/" },
  { name: "instagramLogo", src: instagramLogo, href: "https://www.instagram.com/banksampahbersinar.id?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
];

const Hero = () => {
  return (
    <WavyBackground>
      <div className="container">
        <Header />
        <Main />
      </div>
    </WavyBackground>
  );
};

// const Main = () => {
//   return (
//     <main>
//       <div className="kiri">
//         <h1>Daur Sampah Sekarang!</h1>
//         <p>
//           Tindakan kecil kita dalam mendaur ulang sampah memiliki dampak besar
//           untuk lingkungan. Dengan setiap botol plastik atau kertas yang kita
//           daur ulang, kita membantu mengurangi limbah dan mencegah pencemaran
//           lingkungan. Mari bersama-sama menjaga bumi kita dengan tindakan
//           sederhana ini!
//         </p>
//         {/* <button>Register Now!</button> */}
//         <Button>Register Now</Button>
//       </div>
//       <div className="kanan">
//         <p className="desc">
//           Bank Sampah Bersinar: Inovasi penanganan sampah dengan partisipasi
//           aktif masyarakat, edukasi, sistem reward, kontrol terintegrasi, dan
//           prinsip ekonomi circular.
//         </p>
//         <h1 className="achievement-title">Some Achivemenets</h1>
//         <h1 className="achievement-number">± 2Jt Kg</h1>
//         <h2>Total sampah terkumpul</h2>
//         <h1 className="achievement-number">11K</h1>
//         <h2>Total nasabah terdaftar</h2>
//         <p className="address">
//           Jl.Terusan Bojongsoang No.174A Kec.Baleendah, Kab.Bandung Jawa Barat
//           40375
//         </p>
//       </div>
//     </main>
//   );
// };

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate=useNavigate()

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-11 w-auto" src={bankBersinarLogo} alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              <img src={item.src} alt={item.name} className="h-5 w-auto" />
            </a>
          ))}
        </div>
        {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div> */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button className="button1" onClick={()=>navigate('/login')}>Login</Button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-11 w-auto" src={bankBersinarLogo} alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <img src={item.src} alt={item.name} className="h-5 w-auto" />
                  </a>
                ))}
              </div>
              <Button className="button1" onClick={()=>navigate('/login')}>Login</Button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

const Main = () => {
  const navigate=useNavigate()

  return (
    <div className="mainContainer">
      <h1 className="heroTitle">Pantau dan Hitung Kontribusi Anda!</h1>
      <p>Selamat datang di platform kami! Pantau dan hitung kontribusi Anda dalam mengelola tabungan sampah dengan mudah. Bergabunglah sekarang untuk mulai berpartisipasi dalam pelestarian lingkungan!</p>
      <Button className="button2" onClick={()=>navigate("/register2")}>Register Now!</Button>
    </div>
  );
};

export default Hero;
