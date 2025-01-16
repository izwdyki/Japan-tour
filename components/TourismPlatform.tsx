import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { MapPin, Calendar, Sun, Cloud, Sparkles } from 'lucide-react';

const TourismPlatform = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    budget: 50000,
    startDate: '',
    endDate: '',
    interests: [],
  });
  const [recommendations, setRecommendations] = useState([]);

  const interests = [
    { id: 'onsen', label: '温泉', icon: '♨️' },
    { id: 'history', label: '歴史', icon: '🏛️' },
    { id: 'agriculture', label: '農業', icon: '🌾' },
    { id: 'traditional-arts', label: '伝統芸能', icon: '🎭' },
    { id: 'crafts', label: '工芸', icon: '🎨' },
    { id: 'festivals', label: '祭り', icon: '🏮' },
    { id: 'cuisine', label: '伝統料理', icon: '🍱' },
    { id: 'nature', label: '自然', icon: '🗻' },
  ];

  const handleNextStep = () => {
    if (step === 2) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  const handleInterestToggle = (interestId) => {
    setUserPreferences(prev => {
      const interests = [...prev.interests];
      const index = interests.indexOf(interestId);
      if (index === -1) {
        interests.push(interestId);
      } else {
        interests.splice(index, 1);
      }
      return { ...prev, interests };
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setRecommendations([
        {
          location: "富良野",
          weather: "晴れ",
          temperature: 24,
          specialEvent: "ラベンダーフェスティバル",
          matchScore: 92
        },
        {
          location: "別府",
          weather: "曇り",
          temperature: 22,
          specialEvent: "温泉まつり",
          matchScore: 85
        }
      ]);
      setIsLoading(false);
      setStep(3);
    }, 2000);
  };

  const resetToStart = () => {
    setStep(1);
    setUserPreferences({
      budget: 50000,
      startDate: '',
      endDate: '',
      interests: [],
    });
    setRecommendations([]);
  };

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="transition-all duration-300">
              <label className="block mb-2 text-purple-700 font-medium">予算（円）</label>
              <Slider
                value={[userPreferences.budget]}
                onValueChange={([value]) => setUserPreferences(prev => ({ ...prev, budget: value }))}
                max={200000}
                step={1000}
                className="w-full"
              />
              <div className="text-right text-pink-600 font-medium">
                {userPreferences.budget.toLocaleString()}円
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-purple-700 font-medium">旅行期間</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">出発日</label>
                  <input
                    type="date"
                    value={userPreferences.startDate}
                    onChange={(e) => setUserPreferences(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full mt-1 p-2 border border-purple-200 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">帰宅日</label>
                  <input
                    type="date"
                    value={userPreferences.endDate}
                    onChange={(e) => setUserPreferences(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full mt-1 p-2 border border-purple-200 rounded-md"
                  />
                </div>
              </div>
            </div>

            <Button 
              onClick={handleNextStep}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 rounded-lg"
            >
              次へ
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <label className="block mb-4 text-purple-700 font-medium">興味のある項目を選択してください</label>
            <div className="grid grid-cols-2 gap-4">
              {interests.map((interest) => (
                <Button
                  key={interest.id}
                  onClick={() => handleInterestToggle(interest.id)}
                  className={`h-16 ${
                    userPreferences.interests.includes(interest.id)
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-white text-purple-700 border border-purple-200'
                  }`}
                >
                  <span className="mr-2">{interest.icon}</span>
                  {interest.label}
                </Button>
              ))}
            </div>
            <Button 
              onClick={handleNextStep}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium py-3 rounded-lg"
              disabled={userPreferences.interests.length === 0}
            >
              プランを探す
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <Card 
                key={index} 
                className="p-6 bg-white/80 backdrop-blur-sm border border-purple-100 shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-purple-800 flex items-center">
                      <MapPin className="mr-2 text-pink-500" />
                      {rec.location}
                    </h3>
                    <div className="flex items-center mt-3 text-gray-600">
                      {rec.weather === "晴れ" ? 
                        <Sun className="mr-2 text-yellow-500" /> : 
                        <Cloud className="mr-2 text-blue-500" />
                      }
                      {rec.weather} / {rec.temperature}℃
                    </div>
                    <div className="mt-3">
                      <span className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full px-4 py-1 text-sm font-medium">
                        {rec.specialEvent}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="text-lg font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
                      マッチ度: {rec.matchScore}%
                    </div>
                    <Button
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm px-4 py-2 rounded-lg hover:opacity-90"
                    >
                      詳細へ進む
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            
            <div className="flex justify-center mt-8">
              <Button
                onClick={resetToStart}
                className="bg-white text-purple-600 border border-purple-200 px-6 py-2 rounded-lg hover:bg-purple-50 transition-colors duration-300"
              >
                最初からやり直す
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-800 text-lg font-medium">リアルタイム情報検索中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            さあ、行こう。
          </h1>
          <p className="text-gray-600 mt-2 text-lg">
            まだ知られぬあなたの理想郷へ。
          </p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border border-purple-100 shadow-lg">
          <CardHeader className="border-b border-purple-100">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-purple-800 flex items-center">
                <Sparkles className="mr-2 text-pink-500" />
                {step === 1 ? '基本情報の入力' : 
                 step === 2 ? '興味・関心の選択' :
                 'おすすめプラン'}
              </h2>
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-3 h-3 rounded-full ${
                      s === step
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                        : s < step
                        ? 'bg-gray-300'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TourismPlatform;
