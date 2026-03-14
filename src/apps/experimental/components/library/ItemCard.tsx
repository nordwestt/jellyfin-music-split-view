import type { BaseItemKind } from '@jellyfin/sdk/lib/generated-client/models/base-item-kind';
import type { CollectionType } from '@jellyfin/sdk/lib/generated-client/models/collection-type';
import React, { FC } from 'react';
import type { ParentId } from 'types/library';
import { Box } from '@mui/material';
import { BaseItemDto, ImageType } from '@jellyfin/sdk/lib/generated-client';
import { getImageUrl } from 'apps/stable/features/playback/utils/image';
import { ItemDto } from 'types/base/models/item-dto';
import { ServerConnections } from 'lib/jellyfin-apiclient';
import { getCardImageUrl } from 'components/cardbuilder/cardBuilder';

interface ItemCardProps {
    item: BaseItemDto;
}

const ItemCard: FC<ItemCardProps> = ({ item }) => {
    const [backdropUrl, setBackdropUrl] = React.useState<string | null>(null);

    React.useEffect(() => {
        console.log('Fetching image for item:', item);
        // const url = getThumbImageUrl(item);
        const url = getCardImageUrl(item, ServerConnections.getApiClient(item.ServerId!), {}, 'Thumb').imgUrl;
        console.log('Fetched image URL:', url);
        setBackdropUrl(url);
        // setBackdropUrl(url);
    }, [item]);

    return (
        <Box>
            <Box sx={{ width: 150, height: 150, marginBottom: 1, background: backdropUrl ? `linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.2)), url(${backdropUrl}) center/cover` : 'rgba(0,0,0,0.9)',  }}>
            </Box>
            <h3>{item.Name}</h3>
        </Box>
    );
};

export default ItemCard;
