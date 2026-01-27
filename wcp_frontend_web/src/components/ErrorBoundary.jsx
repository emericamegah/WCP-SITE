import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("DIAGNOSTIC ERROR:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 bg-red-50 border-4 border-red-500 rounded-2xl m-4">
                    <h1 className="text-2xl font-black text-red-600 mb-4">CRASH DETECTÉ</h1>
                    <pre className="p-4 bg-white rounded-lg border text-xs text-red-500 overflow-auto max-h-96">
                        {this.state.error?.stack || this.state.error?.message}
                    </pre>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
