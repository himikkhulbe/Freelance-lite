import React from "react";

const Filters = ({selectedCategory, setSelectedCategory, selectedBudget, setSelectedBudget, sortBy, setSortBy, categories, budgetRanges}) => {

  return (
    <>
      {/* Sidebar */}
      <div className="hidden lg:block sticky top-[11%] lg:top-[11%] max-2xl:top-[11%] h-min py-3 w-1/3 rounded-md bg-white border border-gray-200 shadow-lg">
        <h3 className="font-semibold pt-2 px-3">Filters</h3>

        {/* Category Filter */}
        <div className="p-3 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Filter */}
        <div className="p-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget Range
          </label>
          <select
            value={selectedBudget}
            onChange={(e) => setSelectedBudget(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div className="p-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="budget-high">Highest Budget</option>
            <option value="budget-low">Lowest Budget</option>
            <option value="deadline">Deadline (Urgent First)</option>
          </select>
        </div>

        {/* Clear Filters */}
        <div className="p-3">
          <button
            onClick={() => {
              setSelectedCategory("All Categories");
              setSelectedBudget("All Budgets");
              // setSearchTerm('');
              setSortBy("newest");
            }}
            className="w-full px-4 py-2  text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default Filters;
