// Login.js
import React, { useContext, useEffect, useRef } from 'react';
import { LoginContext } from './LoginContext';
import Loginform from './Loginform';
import Signupform from './SignUpform';

const LoginModal = () => {
    const { themestate, openSignup, isLoginOpen, openLogin, setLoginOpen, close, isSignupOpen, setSignupOpen } = useContext(LoginContext);
    const modalRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target) && !event.target.classList.contains('son')) {
                close();
            }
        };

        if (isLoginOpen || isSignupOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isLoginOpen, isSignupOpen, close]);


    return (
        (isLoginOpen || isSignupOpen) && (
            <div className={`${isLoginOpen || isSignupOpen ? 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ease-out opacity-100 backdrop-blur-sm' : 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-200 ease-in opacity-0 pointer-events-none'}`}>
                <div ref={modalRef} className={`${themestate && isLoginOpen || themestate && isSignupOpen ? 'bg-white p-6 pb-2 rounded-2xl shadow-lg transform transition-transform duration-300 ease-out scale-100' : 'bg-[#475569] p-6 pb-2 rounded-2xl shadow-lg transform transition-transform duration-200 ease-in scale-100'}`}>
                    <button className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700" onClick={close}>
                        &times;
                    </button>
                    <h2 className="text-2xl mb-3">{isSignupOpen ? 'Sign Up' : 'Login'}</h2>
                    <div className="son">
                        {isSignupOpen ?
                            <Signupform close={close} openLogin={openLogin}></Signupform> :
                            <Loginform close={close} openSignup={openSignup}></Loginform>
                        }
                    </div>
                </div>
            </div >)
    );
};

export default LoginModal