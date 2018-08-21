import React, { Component } from 'react';
import { connect } from 'react-redux'
import {OrganizationChart} from 'primereact/components/organizationchart/OrganizationChart';
import {DataTable} from 'primereact/components/datatable/DataTable';
import {DataView, DataViewLayoutOptions} from 'primereact/components/dataview/DataView';
import {Tree} from 'primereact/components/tree/Tree';
import {TreeTable} from 'primereact/components/treetable/TreeTable';
import {Column} from 'primereact/components/column/Column'
import {PickList} from 'primereact/components/picklist/PickList';
import {OrderList} from 'primereact/components/orderlist/OrderList';
import {Schedule} from 'primereact/components/schedule/Schedule';
import {Panel} from 'primereact/components/panel/Panel';
import {Button} from 'primereact/components/button/Button';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Dropdown} from 'primereact/components/dropdown/Dropdown';

import { fetchOrders } from './actions/orders'

class OrdersView extends Component {

    constructor() {
        super();
        this.state = {
            dataTableValue: [],
            treeData: [],
            treeTableData: [],
            picklistSourceCars: [],
            picklistTargetCars: [],
            orderlistCars: [],
            scheduleEvents: [],
            orders: [],
            organizationSelect: null
        };
        this.dataViewHeaderTemplate = this.dataViewHeaderTemplate.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
    }

    componentDidMount() {
        this.props.fetchOrders()
    }

    onSortChange(event) {
        let value = event.value;

        if (value.indexOf('!') === 0) {
            this.setState({sortOrder: -1, sortField:value.substring(1, value.length), sortKey: value});
        }
        else {
            this.setState({sortOrder: 1, sortField:value, sortKey: value});
        }
    }

    dataViewHeaderTemplate() {
        let sortOptions = [
            {label: 'Newest First', value: '!year'},
            {label: 'Oldest First', value: 'year'},
            {label: 'Brand', value: 'brand'}
        ];

        return <div className="ui-g">
                    <div className="ui-g-12 ui-md-4">
                        <Dropdown options={sortOptions} value={this.state.sortKey} placeholder="Sort By" onChange={this.onSortChange} autoWidth={false} style={{minWidth:'15em'}}/>
                    </div>
                    <div className="ui-g-6 ui-md-4 filter-container">
                        <div style={{position:'relative'}}>
                            <InputText placeholder="Search by brand" onKeyUp={e=>this.dv.filter(e.target.value)}/>
                        </div>
                    </div>
                    <div className="ui-g-6 ui-md-4" style={{textAlign: 'right'}}>
                        <DataViewLayoutOptions onClick={(e)=>this.dv.changeLayout(e.originalEvent,e.layout)}/>
                    </div>
                </div>;
    }

    render(){

        let organizationValue = [{
            label: 'F.C Barcelona',
            expanded: true,
            children: [
                {
                    label: 'F.C Barcelona',
                    expanded: true,
                    children: [
                        {
                            label: 'Chelsea FC'
                        },
                        {
                            label: 'F.C. Barcelona'
                        }
                    ]
                },
                {
                    label: 'Real Madrid',
                    expanded: true,
                    children: [
                        {
                            label: 'Bayern Munich'
                        },
                        {
                            label: 'Real Madrid'
                        }
                    ]
                }
            ]
        }];

        let scheduleHeader = {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        };

        let dataViewHeader = this.dataViewHeaderTemplate();

        return (
            <div className="ui-g">
                <div className="ui-g-12">
                    <div className="card card-w-title">
                        <h1>DataTable</h1>
                        <DataTable value={this.props.orders} selectionMode="single" header="Orders" paginator={true} rows={10}
                        responsive={true} selection={this.state.dataTableSelectValue} onSelectionChange={(e) => this.setState({dataTableSelectValue: e.data})}>
                            <Column field="name" header="Case ID" sortable={true}/>
                            <Column field="type" header="Restoration Type" sortable={true}/>
                            <Column field="units" header="Units" sortable={true}/>
                            <Column field="notes" header="Notes" sortable={true}/>
                        </DataTable>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
  orders: state.orders
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrdersView)
