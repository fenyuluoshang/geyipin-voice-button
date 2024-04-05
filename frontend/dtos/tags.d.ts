import { VoiceFilter } from './voice';
export declare class GetTagsFilter {
    anchorId: number;
    includes?: ('anchor' | 'voice' | 'emoticon')[];
    voice?: VoiceFilter;
}
export declare class CreateTagRequest {
    title: string;
    anchorId: number;
}
export declare class TagAddVoice {
    tagId: number;
    targetId: number;
}
