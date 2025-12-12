import { useState } from 'react';

export default function LetterSimulator() {
    const [step, setStep] = useState(1);
    const [letterContent, setLetterContent] = useState('');
    const [recipient, setRecipient] = useState('');
    const [sender, setSender] = useState('');
    const [stampSelected, setStampSelected] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const stamps = [
        { id: 1, name: 'Standard', price: '$0.68', color: 'bg-blue-500' },
        { id: 2, name: 'Priority', price: '$1.35', color: 'bg-red-500' },
        { id: 3, name: 'Express', price: '$2.90', color: 'bg-green-500' }
    ];

    const nextStep = () => {
        if (step < 5) setStep(step + 1);
        if (step === 5) setIsComplete(true);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const canProceed = () => {
        switch (step) {
            case 1: return letterContent.trim().length > 0;
            case 2: return recipient.trim().length > 0 && sender.trim().length > 0;
            case 3: return true;
            case 4: return stampSelected;
            case 5: return true;
            default: return false;
        }
    };

    if (isComplete) {
        return (
            <div className="max-w-2xl mx-auto p-6 text-center">
                <div className="bg-green-100 border border-green-400 rounded-lg p-8 mb-6">
                    <h1 className="text-3xl font-bold text-green-800 mb-4">📮 Letter Posted!</h1>
                    <p className="text-green-700 text-lg">Your letter has been successfully posted and is on its way!</p>
                    <div className="mt-6">
                        <div className="inline-block bg-white p-4 rounded-lg shadow-md">
                            <p className="text-sm text-gray-600">Tracking Number</p>
                            <p className="font-mono text-lg font-bold">LP{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => { setStep(1); setIsComplete(false); setLetterContent(''); setRecipient(''); setSender(''); setStampSelected(false); }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
                >
                    Send Another Letter
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-8">📝 Letter Simulator</h1>
            
            <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            i <= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                        }`}>
                            {i}
                        </div>
                    ))}
                </div>
                <div className="text-center text-sm text-gray-600">
                    Step {step} of 5
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                {step === 1 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">✍️ Write Your Letter</h2>
                        <textarea
                            value={letterContent}
                            onChange={(e) => setLetterContent(e.target.value)}
                            placeholder="Dear friend,&#10;&#10;I hope this letter finds you well..."
                            className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <p className="text-sm text-gray-500 mt-2">{letterContent.length} characters</p>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">📮 Address the Envelope</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">To:</label>
                                <input
                                    type="text"
                                    value={recipient}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    placeholder="Recipient Name and Address"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">From:</label>
                                <input
                                    type="text"
                                    value={sender}
                                    onChange={(e) => setSender(e.target.value)}
                                    placeholder="Your Name and Address"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">📄 Put Letter in Envelope</h2>
                        <div className="text-center">
                            <div className="inline-block bg-gray-100 p-8 rounded-lg border-2 border-dashed border-gray-300">
                                <div className="bg-white p-4 rounded shadow-sm mb-4 transform rotate-2">
                                    <p className="text-sm text-gray-600">Your letter</p>
                                    <p className="text-xs text-gray-400 truncate">{letterContent.substring(0, 50)}...</p>
                                </div>
                                <p className="text-gray-600">📧 Letter placed in envelope</p>
                            </div>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">🏷️ Choose a Stamp</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {stamps.map((stamp) => (
                                <div
                                    key={stamp.id}
                                    onClick={() => setStampSelected(stamp.id)}
                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                                        stampSelected === stamp.id 
                                            ? 'border-blue-500 bg-blue-50' 
                                            : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                >
                                    <div className={`w-16 h-16 ${stamp.color} rounded mx-auto mb-2 flex items-center justify-center text-white font-bold`}>
                                        {stamp.price}
                                    </div>
                                    <p className="text-center font-medium">{stamp.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">📮 Post Your Letter</h2>
                        <div className="text-center">
                            <div className="inline-block bg-blue-900 p-8 rounded-lg text-white mb-4">
                                <div className="w-32 h-6 bg-blue-800 rounded mb-2 mx-auto"></div>
                                <p className="text-sm">Mail Slot</p>
                            </div>
                            <p className="text-gray-600">Click "Post Letter" to drop your letter in the mail slot!</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-between">
                <button
                    onClick={prevStep}
                    disabled={step === 1}
                    className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white font-bold py-2 px-6 rounded-lg disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-6 rounded-lg disabled:cursor-not-allowed"
                >
                    {step === 5 ? 'Post Letter' : 'Next'}
                </button>
            </div>
        </div>
    );
}