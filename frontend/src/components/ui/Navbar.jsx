import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import bankBersinarLogo from "../../assets/img/bank-bersinar-logo.png";
import { Button } from './button';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { deleteTokenFromCookie } from '@/utils/authUtils';
import { useNavigate } from "react-router-dom";
import userIcon from "../../assets/img/user.jpg"
import "./Navbar.css"

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: userIcon
}

const initialNavigation = [
  { name: 'Dashboard', href: '/dashboard', current: true },
  { name: 'Trash Detection', href: '/trash-detaction', current: false },
  { name: 'Price Prediction', href: '/prediction', current: false },
  { name: 'Form', href: '/form', current: false },
  { name: 'Education', href: '/education', current: false },
]

const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Sign out', href: '/' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState(initialNavigation);
  const [currentNav, setCurrentNav] = useState(initialNavigation.find(item => item.current).name);

  const handleLogout = () => {
    deleteTokenFromCookie()
    navigate("/")
  }

  const handleNavClick = (name, href) => {
    const updatedNavigation = navigation.map(item => ({
      ...item,
      current: item.name === name
    }));
    setCurrentNav(name); // Perbarui currentNav saat item navigasi diklik
    setNavigation(updatedNavigation);
    navigate(href);
  }
  

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className='h-10 w-18'
                    src={bankBersinarLogo}
                    alt="Your Company"
                  />
                </div>
                <div className="hidden md:block">
                  <div className='ml-10 flex items-baseline space-x-4'>
                    {initialNavigation.map((item) => (
                      <Button
                        key={item.name}
                        onClick={() => handleNavClick(item.name, item.href)}
                        className={classNames(
                          item.name === currentNav ? 'bg-[#2C7865] text-white' : 'text-black-300',
                          'hover-darkorange',
                          'nav-link'
                        )}
                        style={item.name === currentNav ? { backgroundColor: '#2C7865', color: 'white' } : {}}
                      >
                        {item.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src={userIcon} alt="" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-green ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                                onClick={item.name === 'Sign out' ? handleLogout : null}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-green-800 p-2 text-gray-400 hover:bg-[#2C7865]-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.name === currentNav ? 'bg-[#2C7865] text-white' : 'text-gray-300',
                    'hover-darkorange',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.name === currentNav ? 'page' : undefined}
                  onClick={() => handleNavClick(item.name, item.href)}
                  style={item.name === currentNav ? { backgroundColor: '#2C7865', color: 'white' } : {}}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">{user.name}</div>
                  <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    onClick={item.name === 'Sign out' ? handleLogout : null}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
