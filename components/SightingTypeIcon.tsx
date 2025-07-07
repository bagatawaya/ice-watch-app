import React from 'react';
import { SightingType } from '../types';
import { RoadIcon, HandcuffsIcon, CarIcon, BuildingIcon, HomeIcon, GavelIcon, HelpCircleIcon } from './icons';

interface SightingTypeIconProps {
    type: SightingType;
    className?: string;
}

export const SightingTypeIcon: React.FC<SightingTypeIconProps> = ({ type, className }) => {
    switch (type) {
        case 'checkpoint':
            return <RoadIcon className={className} />;
        case 'detainment':
            return <HandcuffsIcon className={className} />;
        case 'sighting_motion':
            return <CarIcon className={className} />;
        case 'sighting_stationary':
            return <CarIcon className={className} />;
        case 'workplace_raid':
            return <BuildingIcon className={className} />;
        case 'residential':
            return <HomeIcon className={className} />;
        case 'courthouse':
            return <GavelIcon className={className} />;
        case 'other':
        default:
            return <HelpCircleIcon className={className} />;
    }
};
