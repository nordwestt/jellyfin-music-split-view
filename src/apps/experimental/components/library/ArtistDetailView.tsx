import React, { FC, useEffect } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { ItemDto } from 'types/base/models/item-dto';
// import { getBackdropImageUrl } from 'utils/jellyfin-client/images';
import { useItem } from 'hooks/useItem';
import { ParentId } from 'types/library';
import ItemsView from './ItemsView';
import { LibraryTab } from 'types/libraryTab';
import { CollectionType } from '@jellyfin/sdk/lib/generated-client';
import { set } from 'date-fns';


interface ArtistDetailViewProps {
    parentId: ParentId;
}

const ArtistDetailView: FC<ArtistDetailViewProps> = ({
    parentId,
}) => {

    const [artistData, setArtistData] = React.useState<ItemDto | undefined>(undefined);
    const itemResult = useItem(parentId?.toString());
    React.useEffect(() => {
        if (itemResult.data) {
            console.log('Artist data fetched:', itemResult.data);
            setArtistData(itemResult.data);
        }
    }, [itemResult.data]);

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                // background: backdropUrl ? `linear-gradient(180deg,rgba(0,0,0,0.8),rgba(0,0,0,0.95)), url(${backdropUrl}) center/cover` : 'rgba(0,0,0,0.9)',
                padding: 2,
                borderRadius: 2,
                color: 'common.white'
            }}
        >
            <Box>
                <Typography variant="h4" component="h2" gutterBottom>
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