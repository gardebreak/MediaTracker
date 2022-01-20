import { Watchlist } from 'src/entity/watchlist';
import { repository } from 'src/repository/repository';

export const watchlistRepository = new (repository<Watchlist>({
    tableName: 'watchlist',
    primaryColumnName: 'id',
}))();