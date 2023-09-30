import React, { useEffect } from 'react';
import reset from '../../assest/reset.png';

const PasswordResetSucc = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.close(); // Close the current window/tab
    }, 3000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timer); // Clear the timer if the component unmounts
  }, []);

  return (
    <div className="bg-green-500 text-white rounded-lg shadow-md text-center flex flex-col items-center gap-4 p-8 w-full h-screen">
      <img
        src={reset} // Add your success image path here
        alt="Success"
        className="h-96 w-96 md:h-128 md:w-128 lg:h-160 lg:w-160"
      />
      <h2 className="text-4xl font-semibold mb-2">Password Reset Successful</h2>
      <p className="text-lg">Your password has been successfully reset.</p>
    </div>
  );
};

export default PasswordResetSucc;
