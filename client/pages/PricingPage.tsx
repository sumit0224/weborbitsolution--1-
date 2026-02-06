import React from 'react';
import Pricing from '../components/Pricing';
import Seo from '../components/Seo';

const PricingPage: React.FC = () => {
    return (
        <>
            <Seo
                title="Pricing Plans | WebOrbitSolution"
                description="Choose the perfect web design and development package for your business. Transparent pricing, premium deliverables."
                path="/pricing"
            />
            <div className="pt-24">
                <Pricing />
            </div>
        </>
    );
};

export default PricingPage;
