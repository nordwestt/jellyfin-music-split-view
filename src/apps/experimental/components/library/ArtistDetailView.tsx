import React, { FC, useEffect } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { ItemDto } from 'types/base/models/item-dto';
// import { getBackdropImageUrl } from 'utils/jellyfin-client/images';
import { useItem } from 'hooks/useItem';
import { ParentId } from 'types/library';
import ItemsView from './ItemsView';
import { LibraryTab } from 'types/libraryTab';
import { CollectionType, ImageType } from '@jellyfin/sdk/lib/generated-client';
import { getImageUrl } from 'apps/stable/features/playback/utils/image';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary/AccordionSummary';
import { T } from 'vitest/dist/chunks/reporters.d.BFLkQcL6';

interface ArtistDetailViewProps {
    parentId: ParentId;
}

const ArtistDetailView: FC<ArtistDetailViewProps> = ({
    parentId,
}) => {

    const [artistData, setArtistData] = React.useState<ItemDto | undefined>(undefined);
    const [backdropUrl, setBackdropUrl] = React.useState<string | null>(null);
    const [overviewExpanded, setOverviewExpanded] = React.useState<boolean>(false);

    const itemResult = useItem(parentId?.toString());
    React.useEffect(() => {
        if (itemResult.data) {
            console.log('Artist data fetched:', itemResult.data);
            setArtistData(itemResult.data);
            let bgUrl = getBackgroundImageUrl();
            setBackdropUrl(bgUrl);
            console.log('Background image URL:', bgUrl);
            artistData?.Overview
        }
    }, [itemResult.data]);

    const getBackgroundImageUrl = () => {
        return getImageUrl(itemResult.data!, { type: ImageType.Primary });
    }

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: 2,
                color: 'common.white'
            }}
        >
            <Box sx={{
                padding: '200px 0px  0px 20px',
                background: backdropUrl ? `linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,0.95)), url(${backdropUrl}) center/cover` : 'rgba(0,0,0,0.9)',
            }}>
                <Typography variant="h1" component="h1" gutterBottom>
                    {artistData?.Name || parentId}
                </Typography>
            </Box>

            <Accordion expanded={overviewExpanded} onChange={() => setOverviewExpanded(!overviewExpanded)} sx={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Box sx={{gap: 1, display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Typography variant="h1" component="h1" gutterBottom>
                            About 
                        </Typography>
                        {!overviewExpanded && (
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)' }}>
                            {artistData?.Overview ? `${artistData.Overview.substring(0, 100)}...` : 'No overview available for this artist yet.'}
                        </Typography>)}
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.85)' }}>
                        {artistData?.Overview || 'No overview available for this artist yet.'}
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.25)' }} />

            <ItemsView
                    viewType={LibraryTab.Songs}
                    parentId={parentId}
                    collectionType={CollectionType.Music}
                    itemType={[]}
                    noItemsMessage={
                        'No songs available'
                    }
                />

            
        </Box>
    );
};

export default ArtistDetailView;