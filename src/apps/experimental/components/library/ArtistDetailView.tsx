import React, { FC, useEffect } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { ItemDto } from 'types/base/models/item-dto';
// import { getBackdropImageUrl } from 'utils/jellyfin-client/images';
import { useItem } from 'hooks/useItem';
import { ParentId } from 'types/library';
import ItemsView from './ItemsView';
import { LibraryTab } from 'types/libraryTab';
import { CollectionType, ImageType } from '@jellyfin/sdk/lib/generated-client';
import { set } from 'date-fns';
import { getImageUrl } from 'apps/stable/features/playback/utils/image';


interface ArtistDetailViewProps {
    parentId: ParentId;
}

const ArtistDetailView: FC<ArtistDetailViewProps> = ({
    parentId,
}) => {

    const [artistData, setArtistData] = React.useState<ItemDto | undefined>(undefined);
    const [backdropUrl, setBackdropUrl] = React.useState<string | null>(null);

    const itemResult = useItem(parentId?.toString());
    React.useEffect(() => {
        if (itemResult.data) {
            console.log('Artist data fetched:', itemResult.data);
            setArtistData(itemResult.data);
            let bgUrl = getBackgroundImageUrl();
            setBackdropUrl(bgUrl);
            console.log('Background image URL:', bgUrl);
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