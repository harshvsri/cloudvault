const Loader = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
            <div className="space-y-2">
                <div className="flex space-x-2">
                    {[0, 1, 2].map((index) => (
                        <div
                            key={index}
                            className="h-16 w-4 bg-white"
                            style={{
                                animation: `growShrink 1.5s ease-in-out ${index * 0.2}s infinite`,
                            }}
                        ></div>
                    ))}
                </div>
            </div>
            <p className="mt-8 text-sm font-light tracking-widest">LOADING</p>
            <style>{`
        @keyframes growShrink {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1); }
        }
      `}</style>
        </div>
    );
};

export default Loader;
