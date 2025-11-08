import React, { useState, useCallback } from 'react';
import { analyzePest } from '../services/geminiService';
import { PestAnalysis } from '../types';
import { ArrowLeft, UploadCloud, Bug, Shield, Microscope, AlertTriangle, Loader2, CheckCircle } from 'lucide-react';
import { useLocalization } from '../contexts/LocalizationContext';

// --- Shared Components ---
const PageHeader: React.FC<{ title: string; onBack: () => void }> = ({ title, onBack }) => (
  <header className="bg-brand-header p-4 flex items-center text-white sticky top-0 z-10 shadow-sm">
    <button onClick={onBack} className="mr-4 p-1 rounded-full hover:bg-white/20" aria-label="Go back">
      <ArrowLeft className="w-6 h-6" />
    </button>
    <h1 className="text-xl font-bold">{title}</h1>
  </header>
);

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; content: string; }> = ({ icon, title, content }) => (
  <div>
    <h4 className="font-semibold text-md text-black flex items-center mb-1">
      <span className="text-primary-600 mr-2">{icon}</span>
      {title}
    </h4>
    <p className="text-black text-sm pl-8">{content}</p>
  </div>
);

// Helper to convert file to base64
const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
});

const PestAdvisoryPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const { t } = useLocalization();
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<PestAnalysis | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setAnalysis(null);
            setError(null);
        }
    };

    const handleAnalyze = useCallback(async () => {
        if (!image) return;

        setIsLoading(true);
        setError(null);
        setAnalysis(null);

        try {
            const base64Image = await toBase64(image);
            const result = await analyzePest(base64Image, image.type);
            setAnalysis(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    }, [image]);

    return (
        <div className="max-w-md mx-auto bg-brand-bg min-h-screen">
            <PageHeader title={t('pestAdvisory.title')} onBack={onBack} />
            <main className="p-4 space-y-4">
                {/* Uploader Card */}
                <div className="bg-white/80 backdrop-blur-sm p-4 rounded-3xl shadow-lg text-center">
                    <h2 className="text-lg font-semibold text-black mb-2">{t('pestAdvisory.uploadTitle')}</h2>
                    <label htmlFor="leaf-upload" className="cursor-pointer block">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-500 transition-colors">
                        {preview ? (
                            <img src={preview} alt="Leaf preview" className="max-h-48 mx-auto rounded-md" />
                        ) : (
                            <div className="flex flex-col items-center text-gray-500">
                                <UploadCloud className="h-12 w-12" />
                                <p className="mt-2 text-sm">{t('pestAdvisory.uploadPrompt')}</p>
                                <p className="text-xs">{t('pestAdvisory.uploadFormats')}</p>
                            </div>
                        )}
                        </div>
                    </label>
                    <input id="leaf-upload" type="file" className="hidden" accept="image/*" capture="environment" onChange={handleFileChange} />
                    {image && (
                        <button onClick={handleAnalyze} disabled={isLoading} className="mt-4 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300">
                            {isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {t('pestAdvisory.analyzing')}</> : t('pestAdvisory.analyze')}
                        </button>
                    )}
                </div>

                {/* Error Display */}
                {error && <div className="text-center text-red-600 bg-red-100 p-4 rounded-xl shadow">{error}</div>}

                {/* Analysis Results */}
                {analysis && (
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-black text-center">{t('pestAdvisory.analysisResult')}</h2>
                        <div className={`p-4 rounded-3xl shadow-lg ${analysis.disease === 'Healthy' ? 'bg-green-100' : 'bg-red-100'}`}>
                            <div className="flex items-center">
                                <div className={`p-3 rounded-full mr-4 ${analysis.disease === 'Healthy' ? 'bg-green-200' : 'bg-red-200'}`}>
                                    {analysis.disease === 'Healthy' ? <CheckCircle className="w-6 h-6 text-green-700"/> : <Bug className="w-6 h-6 text-red-700"/>}
                                </div>
                                <div>
                                    <h3 className={`text-xl font-semibold ${analysis.disease === 'Healthy' ? 'text-green-900' : 'text-red-900'}`}>
                                        {analysis.disease === 'Healthy' ? t('pestAdvisory.healthy') : analysis.disease}
                                    </h3>
                                    <p className={`text-sm font-medium ${analysis.disease === 'Healthy' ? 'text-green-700' : 'text-red-700'}`}>{t('pestAdvisory.confidence')}: {(analysis.confidence * 100).toFixed(1)}%</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-3xl shadow-lg space-y-3">
                            <InfoCard icon={<Microscope className="w-5 h-5"/>} title={t('pestAdvisory.description')} content={analysis.description} />
                            <InfoCard icon={<AlertTriangle className="w-5 h-5"/>} title={t('pestAdvisory.recommendedAction')} content={analysis.recommendedAction} />
                            <InfoCard icon={<Shield className="w-5 h-5"/>} title={t('pestAdvisory.preventiveMeasures')} content={analysis.preventiveMeasures} />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PestAdvisoryPage;