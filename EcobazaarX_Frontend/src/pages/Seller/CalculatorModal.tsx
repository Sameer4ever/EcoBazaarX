import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface CalculatorModalProps {
    onClose: () => void;
    onCalculate: (footprint: number) => void;
}

const CalculatorModal: React.FC<CalculatorModalProps> = ({ onClose, onCalculate }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        material: 'Cotton',
        weight: '',
        origin: 'India',
        packaging: 'Recycled Cardboard'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8081/api/carbon/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, weight: Number(formData.weight) })
            });

            if (!response.ok) {
                throw new Error('Calculation failed. Please check your inputs.');
            }

            const result = await response.json();
            onCalculate(result.carbonEmission);
            onClose();

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full relative">
                <h2 className="text-xl font-bold mb-6">Eco Impact Calculator</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Primary Material</label>
                        <select name="material" value={formData.material} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                            <option>Cotton</option>
                            <option>Recycled Plastic</option>
                            <option>Wood (Oak)</option>
                            <option>Glass</option>
                            <option>Stainless Steel</option>
                        </select>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Product Weight (in grams)</label>
                        <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Country of Origin</label>
                         <select name="origin" value={formData.origin} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                            <option>India</option>
                            <option>USA</option>
                            <option>China</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Packaging Material</label>
                         <select name="packaging" value={formData.packaging} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                            <option>Recycled Cardboard</option>
                            <option>Virgin Plastic</option>
                            <option>None</option>
                        </select>
                    </div>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300">Cancel</button>
                        <button type="submit" disabled={isLoading} className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:bg-gray-400 flex items-center">
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Estimate Footprint
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CalculatorModal;