import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {DataTable} from 'primereact/components/datatable/DataTable';
import { DataViewLayoutOptions} from 'primereact/components/dataview/DataView';
import {Column} from 'primereact/components/column/Column'
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
    }

    componentDidMount() {
        this.props.fetchOrders(this.props.user.token)
    }

    render(){
      if (!this.props.user.isAuthenticated) {
        return <Redirect to='/login' from='/' />
      }
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
  orders: state.orders,
  user: state.user,
})

const mapDispatchToProps = dispatch => ({
  fetchOrders: token => dispatch(fetchOrders(token))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrdersView)
