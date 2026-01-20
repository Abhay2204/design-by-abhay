import React from 'react';

const Layout: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
      <div className="w-full h-full grid grid-cols-5 border-x border-white/10 mx-auto max-w-[95%]">
        {/* We render 5 columns. The borders will be handled by the columns themselves */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={`h-full border-r border-white/10 ${i === 0 ? 'border-l' : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Layout;
