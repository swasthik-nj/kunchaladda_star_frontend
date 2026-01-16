import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('Verifying your email...');
    const [resending, setResending] = useState(false);

    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token || !email) {
                setStatus('error');
                setMessage('Invalid verification link. Missing token or email.');
                return;
            }

            try {
                const response = await axios.post(
                    `${backendUrl}/api/v1/auth/verify-email`,
                    { token, email },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                setStatus('success');
                setMessage(response.data.message || 'Email verified successfully!');

                // Redirect to login after 3 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } catch (error) {
                setStatus('error');
                const errorMsg = error.response?.data?.message || 'Failed to verify email. The link may be expired or invalid.';
                setMessage(errorMsg);
                console.error('Verification error:', error);
            }
        };

        verifyEmail();
    }, [token, email, navigate, backendUrl]);

    const handleResendEmail = async () => {
        if (!email) {
            alert('Email address not found in URL');
            return;
        }

        setResending(true);
        try {
            const response = await axios.post(
                `${backendUrl}/api/v1/auth/resend-verification-email`,
                { email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            alert(response.data.message || 'Verification email sent! Please check your inbox.');
            setResending(false);
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Failed to resend verification email.';
            alert(errorMsg);
            setResending(false);
            console.error('Resend error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
                <div className="text-center">
                    {/* Icon based on status */}
                    {status === 'verifying' && (
                        <div className="mx-auto w-16 h-16 mb-4">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="mx-auto w-16 h-16 mb-4 bg-green-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-10 h-10 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="mx-auto w-16 h-16 mb-4 bg-red-100 rounded-full flex items-center justify-center">
                            <svg
                                className="w-10 h-10 text-red-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    )}

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {status === 'verifying' && 'Verifying Email'}
                        {status === 'success' && 'Email Verified!'}
                        {status === 'error' && 'Verification Failed'}
                    </h1>

                    {/* Message */}
                    <p className={`text-lg mb-6 ${
                        status === 'success' ? 'text-green-600' :
                        status === 'error' ? 'text-red-600' :
                        'text-gray-600'
                    }`}>
                        {message}
                    </p>

                    {/* Actions */}
                    <div className="space-y-3">
                        {status === 'success' && (
                            <div>
                                <p className="text-gray-500 text-sm mb-4">
                                    Redirecting to login page in 3 seconds...
                                </p>
                                <Link
                                    to="/login"
                                    className="inline-block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                                >
                                    Go to Login Now
                                </Link>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="space-y-3">
                                <button
                                    onClick={handleResendEmail}
                                    disabled={resending}
                                    className={`w-full py-3 px-6 rounded-lg font-semibold transition duration-200 ${
                                        resending
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                                >
                                    {resending ? 'Sending...' : 'Resend Verification Email'}
                                </button>
                                <Link
                                    to="/login"
                                    className="block w-full text-center text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    Back to Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block w-full text-center text-gray-600 hover:text-gray-700 text-sm"
                                >
                                    Register a New Account
                                </Link>
                            </div>
                        )}

                        {status === 'verifying' && (
                            <p className="text-gray-500 text-sm">
                                Please wait while we verify your email address...
                            </p>
                        )}
                    </div>
                </div>

                {/* Help text */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-gray-500 text-xs text-center">
                        Having trouble? Contact support or check your spam folder.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;
