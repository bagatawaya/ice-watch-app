import { SightingType } from "../types";

interface SightingTypeInfo {
    id: SightingType;
    nameKey: string;
    descriptionKey: string;
    usefulnessKey: string;
}

export const sightingTypes: SightingTypeInfo[] = [
    {
        id: 'checkpoint',
        nameKey: 'sightingTypeName_checkpoint',
        descriptionKey: 'sightingTypeDesc_checkpoint',
        usefulnessKey: 'sightingTypeUsefulness_checkpoint',
    },
    {
        id: 'detainment',
        nameKey: 'sightingTypeName_detainment',
        descriptionKey: 'sightingTypeDesc_detainment',
        usefulnessKey: 'sightingTypeUsefulness_detainment',
    },
    {
        id: 'sighting_motion',
        nameKey: 'sightingTypeName_sighting_motion',
        descriptionKey: 'sightingTypeDesc_sighting_motion',
        usefulnessKey: 'sightingTypeUsefulness_sighting_motion',
    },
    {
        id: 'sighting_stationary',
        nameKey: 'sightingTypeName_sighting_stationary',
        descriptionKey: 'sightingTypeDesc_sighting_stationary',
        usefulnessKey: 'sightingTypeUsefulness_sighting_stationary',
    },
    {
        id: 'workplace_raid',
        nameKey: 'sightingTypeName_workplace_raid',
        descriptionKey: 'sightingTypeDesc_workplace_raid',
        usefulnessKey: 'sightingTypeUsefulness_workplace_raid',
    },
    {
        id: 'residential',
        nameKey: 'sightingTypeName_residential',
        descriptionKey: 'sightingTypeDesc_residential',
        usefulnessKey: 'sightingTypeUsefulness_residential',
    },
    {
        id: 'courthouse',
        nameKey: 'sightingTypeName_courthouse',
        descriptionKey: 'sightingTypeDesc_courthouse',
        usefulnessKey: 'sightingTypeUsefulness_courthouse',
    },
    {
        id: 'other',
        nameKey: 'sightingTypeName_other',
        descriptionKey: 'sightingTypeDesc_other',
        usefulnessKey: 'sightingTypeUsefulness_other',
    },
];
