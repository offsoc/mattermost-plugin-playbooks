// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import styled from 'styled-components';

import {FetchPlaybookRunsParams} from 'src/types/playbook_run';
import {SortableColHeader} from 'src/components/sortable_col_header';

const PlaybookRunListHeader = styled.div`
    font-weight: 600;
    font-size: 11px;
    line-height: 36px;
    color: var(--center-channel-color-72);
    background-color: var(--center-channel-color-04);
    border-radius: 4px;
    padding: 0 1.6rem;
`;

interface Props {
    fetchParams: FetchPlaybookRunsParams
    setFetchParams: React.Dispatch<React.SetStateAction<FetchPlaybookRunsParams>>
}

const RunListHeader = ({fetchParams, setFetchParams}: Props) => {
    function colHeaderClicked(colName: string) {
        if (fetchParams.sort === colName) {
            // we're already sorting on this column; reverse the direction
            const newDirection = fetchParams.direction === 'asc' ? 'desc' : 'asc';

            setFetchParams((oldParams: FetchPlaybookRunsParams) => {
                return {...oldParams, direction: newDirection};
            });
            return;
        }

        // change to a new column; default to descending for time-based columns, ascending otherwise
        let newDirection = 'desc';
        if (['name', 'is_active'].indexOf(colName) !== -1) {
            newDirection = 'asc';
        }

        setFetchParams((oldParams: FetchPlaybookRunsParams) => {
            return {...oldParams, sort: colName, direction: newDirection};
        });
    }
    return (
        <PlaybookRunListHeader>
            <div className='row'>
                <div className='col-sm-4'>
                    <SortableColHeader
                        name={'Run Name'}
                        direction={fetchParams.direction ? fetchParams.direction : 'desc'}
                        active={fetchParams.sort ? fetchParams.sort === 'name' : false}
                        onClick={() => colHeaderClicked('name')}
                    />
                </div>
                <div className='col-sm-2'>
                    <SortableColHeader
                        name={'Status / Last update'}
                        direction={fetchParams.direction ? fetchParams.direction : 'desc'}
                        active={fetchParams.sort ? fetchParams.sort === 'last_status_update_at' : false}
                        onClick={() => colHeaderClicked('last_status_update_at')}
                    />
                </div>
                <div className='col-sm-2'>
                    <SortableColHeader
                        name={'Duration / Started on'}
                        direction={fetchParams.direction ? fetchParams.direction : 'desc'}
                        active={fetchParams.sort ? fetchParams.sort === 'create_at' : false}
                        onClick={() => colHeaderClicked('create_at')}
                    />
                </div>
                <div className='col-sm-2'>
                    {'Owner / Participants'}
                </div>
                <div className='col-sm-2'>
                    {'Tasks finished'}
                </div>
            </div>
        </PlaybookRunListHeader>
    );
};

export default RunListHeader;