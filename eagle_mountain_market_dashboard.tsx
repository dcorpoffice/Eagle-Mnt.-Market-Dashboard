import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter } from 'recharts';

const EagleMountainDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Market status data
  const marketStatusData = [
    { status: 'Active', count: 295, avgPrice: 587116, medianDOM: 42 },
    { status: 'Under Contract', count: 111, avgPrice: 560228, medianDOM: 32 },
    { status: 'Sold', count: 14755, avgPrice: 346321, medianDOM: 27 },
    { status: 'Expired', count: 7801, avgPrice: 278034, medianDOM: 101 },
    { status: 'Canceled', count: 986, avgPrice: 492944, medianDOM: 49 },
    { status: 'Backup', count: 18, avgPrice: 588211, medianDOM: 50 }
  ];

  // Active listings by price range
  const activeListingsData = [
    { range: '350-399k', count: 2, medianDOM: 53 },
    { range: '400-449k', count: 14, medianDOM: 59 },
    { range: '450-499k', count: 65, medianDOM: 44 },
    { range: '500-549k', count: 62, medianDOM: 45 },
    { range: '550-599k', count: 40, medianDOM: 38 },
    { range: '600-649k', count: 37, medianDOM: 31 },
    { range: '650-699k', count: 27, medianDOM: 46 },
    { range: '700-749k', count: 17, medianDOM: 25 },
    { range: '750-799k', count: 12, medianDOM: 34 },
    { range: '800-849k', count: 8, medianDOM: 43 },
    { range: '850-899k', count: 6, medianDOM: 43 },
    { range: '900-949k', count: 5, medianDOM: 44 }
  ];

  // Sold properties by price range (top ranges)
  const soldPropertiesData = [
    { range: '150-199k', count: 2128, medianDOM: 46 },
    { range: '200-249k', count: 2096, medianDOM: 31 },
    { range: '250-299k', count: 1633, medianDOM: 23 },
    { range: '300-349k', count: 1452, medianDOM: 26 },
    { range: '350-399k', count: 1245, medianDOM: 22 },
    { range: '400-449k', count: 1018, medianDOM: 13 },
    { range: '450-499k', count: 1235, medianDOM: 19 },
    { range: '500-549k', count: 1100, medianDOM: 22 },
    { range: '550-599k', count: 698, medianDOM: 17 },
    { range: '600-649k', count: 505, medianDOM: 19 }
  ];

  // Price vs DOM analysis
  const priceVsDOMData = activeListingsData.map(item => ({
    price: item.range,
    dom: item.medianDOM,
    count: item.count
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const TabButton = ({ tab, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(tab)}
      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
        isActive 
          ? 'bg-blue-600 text-white' 
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );

  const StatCard = ({ title, value, subtitle, color = 'blue' }) => (
    <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 border-${color}-500`}>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Eagle Mountain Real Estate Market Analysis
          </h1>
          <p className="text-gray-600">
            Market Summary Report - June 13, 2025 | Single Family Homes up to $950k
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-6">
          <TabButton 
            tab="overview" 
            label="Market Overview" 
            isActive={activeTab === 'overview'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            tab="active" 
            label="Active Listings" 
            isActive={activeTab === 'active'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            tab="sold" 
            label="Sales Analysis" 
            isActive={activeTab === 'sold'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            tab="insights" 
            label="Market Insights" 
            isActive={activeTab === 'insights'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard 
                title="Active Listings" 
                value="295" 
                subtitle="Median: $555,800"
                color="blue"
              />
              <StatCard 
                title="Under Contract" 
                value="111" 
                subtitle="Median: $530,000"
                color="green"
              />
              <StatCard 
                title="Sold (Historical)" 
                value="14,755" 
                subtitle="Median: $315,000"
                color="purple"
              />
              <StatCard 
                title="Expired Listings" 
                value="7,801" 
                subtitle="Median DOM: 101 days"
                color="red"
              />
            </div>

            {/* Market Status Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Market Status Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={marketStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {marketStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [value.toLocaleString(), props.payload.status]} />
                    <Legend 
                      formatter={(value, entry) => `${entry.payload.status}: ${entry.payload.count.toLocaleString()}`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Average Prices by Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={marketStatusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" angle={-45} textAnchor="end" height={80} />
                    <YAxis tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Avg Price']} />
                    <Bar dataKey="avgPrice" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Active Listings Tab */}
        {activeTab === 'active' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Active Listings by Price Range</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={activeListingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Days on Market by Price Range</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={activeListingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, 'Days on Market']} />
                    <Line type="monotone" dataKey="medianDOM" stroke="#FF8042" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Active Listings Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="Price Range" value="$370k - $950k" color="blue" />
                <StatCard title="Median Price" value="$555,800" color="green" />
                <StatCard title="Average Price" value="$587,116" color="purple" />
                <StatCard title="Median DOM" value="42 days" color="orange" />
              </div>
            </div>
          </div>
        )}

        {/* Sales Analysis Tab */}
        {activeTab === 'sold' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Historical Sales Distribution</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={soldPropertiesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="range" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Sold Properties Key Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  <StatCard title="Total Sold" value="14,755" subtitle="Properties" color="green" />
                  <StatCard title="Price Range" value="$49k - $1M" subtitle="Wide range" color="blue" />
                  <StatCard title="Median Price" value="$315,000" subtitle="Historical" color="purple" />
                  <StatCard title="Avg DOM" value="27 days" subtitle="Fast sales" color="orange" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Sales Speed by Price Range</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={soldPropertiesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, 'Days on Market']} />
                    <Line type="monotone" dataKey="medianDOM" stroke="#FF8042" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Market Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-6">Key Market Insights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-blue-600">Market Dynamics</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium">Sweet Spot Pricing</p>
                      <p className="text-sm text-gray-700">Most active inventory is in the $450k-$600k range, with 167 of 295 active listings (57%)</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="font-medium">Fast Moving Inventory</p>
                      <p className="text-sm text-gray-700">Properties $600k+ tend to sell faster (25-34 DOM) compared to lower-priced homes</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="font-medium">Contract Activity</p>
                      <p className="text-sm text-gray-700">111 properties under contract with median DOM of 32 days - healthy absorption rate</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg text-red-600">Market Challenges</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="font-medium">High Expiration Rate</p>
                      <p className="text-sm text-gray-700">7,801 expired listings with 101 DOM average suggests pricing challenges in some segments</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="font-medium">Price Appreciation</p>
                      <p className="text-sm text-gray-700">Active median ($556k) vs sold median ($315k) shows significant price appreciation over time</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="font-medium">Inventory Levels</p>
                      <p className="text-sm text-gray-700">295 active listings may indicate tight inventory in this price-sensitive market</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Market Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-800">For Sellers</h4>
                  <ul className="text-sm text-blue-700 mt-2 space-y-1">
                    <li>• Price competitively in the $450k-$600k range</li>
                    <li>• Expect 30-45 days on market</li>
                    <li>• Higher-end properties move faster</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800">For Buyers</h4>
                  <ul className="text-sm text-green-700 mt-2 space-y-1">
                    <li>• Most options in $450k-$600k range</li>
                    <li>• Act quickly - 32-42 day average to contract</li>
                    <li>• Higher-end homes have less competition</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800">Market Trends</h4>
                  <ul className="text-sm text-purple-700 mt-2 space-y-1">
                    <li>• Strong demand in mid-range pricing</li>
                    <li>• Healthy absorption rate</li>
                    <li>• Price appreciation evident</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EagleMountainDashboard;