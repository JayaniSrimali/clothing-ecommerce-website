'use client';
import toast from 'react-hot-toast';

import { useState } from 'react';
import { Save } from 'lucide-react';

export default function AdminSettingsPage() {
    const [settings, setSettings] = useState({
        storeName: 'AURA.',
        currency: 'USD',
        taxRate: 5,
        emailNotifications: true,
        maintenanceMode: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setSettings({ ...settings, [e.target.name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success('Settings saved (Mock)');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Store Settings</h1>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">General Information</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                                <input
                                    type="text"
                                    name="storeName"
                                    value={settings.storeName}
                                    onChange={handleChange}
                                    className="w-full border-gray-300 rounded-md h-10 px-3 focus:ring-primary focus:border-primary shadow-sm"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                                    <select
                                        name="currency"
                                        value={settings.currency}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-md h-10 px-3 focus:ring-primary focus:border-primary shadow-sm bg-white"
                                    >
                                        <option value="USD">USD ($)</option>
                                        <option value="EUR">EUR (€)</option>
                                        <option value="LKR">LKR (Rs)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                                    <input
                                        type="number"
                                        name="taxRate"
                                        value={settings.taxRate}
                                        onChange={handleChange}
                                        className="w-full border-gray-300 rounded-md h-10 px-3 focus:ring-primary focus:border-primary shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6">
                        <h2 className="text-lg font-semibold mb-4 text-gray-700">Notifications & System</h2>
                        <div className="space-y-4">
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    name="emailNotifications"
                                    checked={settings.emailNotifications}
                                    onChange={handleChange}
                                    className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <span className="text-gray-700">Enable Email Notifications</span>
                            </label>
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    name="maintenanceMode"
                                    checked={settings.maintenanceMode}
                                    onChange={handleChange}
                                    className="h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <span className="text-gray-700">Maintenance Mode</span>
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-secondary transition-colors shadow-sm flex items-center gap-2"
                        >
                            <Save className="w-4 h-4" /> Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
