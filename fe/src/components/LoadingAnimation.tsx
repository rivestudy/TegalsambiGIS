import React from "react";

const DotBounceLoader: React.FC = () => (
    <div className="flex items-center justify-center h-screen space-x-2 ">
        {[...Array(3)].map((_, i) => (
            <div key={i} className={`w-3 h-3 bg-blue-600 rounded-full animate-bounce`} style={{ animationDelay: `${i * 0.2}s` }}></div>
        ))}
    </div>
);

export default DotBounceLoader;
