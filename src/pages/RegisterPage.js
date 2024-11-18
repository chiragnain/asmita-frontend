import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
   const { register } = useAuth();
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState('');  // Success message state
   const navigate = useNavigate();

   const handleRegister = async (e) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
      setSuccess('');

      try {
         // Attempt to register (triggers email confirmation step)
         const response = await register({ full_name: name, email, password, role: "student" });
         
         // Set success message if confirmation email is sent
         if (response?.message) {
            setSuccess('A confirmation email has been sent. Please check your inbox.');
         }
      } catch (err) {
         const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
         setError(errorMessage);
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="bg-gray-200 flex justify-center items-center h-screen">
         <div className="border-t-8 rounded-sm border-indigo-600 bg-white p-12 shadow-2xl w-96">
            <h1 className="font-bold text-center block text-2xl">Register</h1>
            <form onSubmit={handleRegister}>
               <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input 
                     type="text" 
                     id="name" 
                     name="name" 
                     placeholder="Steve Rogers" 
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="mt-1 p-2 border border-gray-300 rounded w-full" 
                     required
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input 
                     type="email" 
                     id="email" 
                     name="email" 
                     placeholder="captain@iiita.ac.in" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="mt-1 p-2 border border-gray-300 rounded w-full" 
                     required
                  />
               </div>
               <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input 
                     type="password" 
                     id="password" 
                     name="password" 
                     placeholder="••••••••••" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="mt-1 p-2 border border-gray-300 rounded w-full" 
                     required
                  />
               </div>
               {error && <p className="text-red-500">{error}</p>}
               {success && <p className="text-green-500">{success}</p>}  {/* Display success message */}
               <button 
                  type="submit" 
                  className={`mt-6 transition-all block py-3 px-4 w-full text-white font-bold rounded cursor-pointer 
                     bg-gradient-to-r from-indigo-600 to-purple-400 hover:from-indigo-700 hover:to-purple-500 
                     focus:bg-indigo-900 transform hover:-translate-y-1 hover:shadow-lg ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={loading}
               >
                  {loading ? "Registering..." : "Register"}
               </button>
            </form>
            <div className="mt-3 flex justify-center">
               <p>Already have an account? 
                  <a href="/login" className="ml-2 text-indigo-600 hover:underline">
                     Log in
                  </a>
               </p>
            </div>
         </div>
      </div>
   );
};

export default RegisterPage;
