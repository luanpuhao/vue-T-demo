<template>
	<div class="v-table" :style="{ height: height }">
		<el-table 
			ref="vtable"
			v-loading="loading" 
			@row-click="rowClick"
			@select="select"
			@select-all="select"
			:data="list" 
			border 
			size="mini" 
			stripe 
			:span-method="spanMethod"
			style="width: 100%" 
			:height="tableHeight"
			highlight-current-row
			:show-summary="showSummary"
			:cell-style="cellStyle"
			:summary-method="summaryMethod"
			:row-style="rowStyle">
			<el-table-column v-if="check" type="selection" align="center" width="55"></el-table-column>
			<el-table-column v-if="index" type="index" align="center" label="序号" width="50"></el-table-column>
			<template v-for="(item,index) in column">
				<el-table-column 
					v-if="!item.slot && !item.hide" 
					:key="index" 
					:prop="item.prop" 
					:width="item.width" 
					:label="item.label" 
					:align="item.align || 'center'" 
					:formatter="item.formatter" 
					:show-overflow-tooltip="item.tooltip">
				</el-table-column>
				<el-table-column 
					v-if="item.slot" 
					:key="index" 
					:label="item.label" 
					:prop="item.prop" 
					:width="item.width" 
					:align="item.align || 'center'">
					<template slot-scope="{ row }">
						<slot :name="item.slot" :row="row" :value="row[item.prop]" :prop="item.prop"></slot>
					</template>
				</el-table-column>
			</template>
		</el-table>
		<el-pagination 
			class="page" 
			v-if="page" 
			background 
			@current-change="handlePage" 
			:current-page.async="page.PageIndex"
			:total="page.PageTotal" 
			:page-size="page.PageSize">
		</el-pagination>
		<div class="total">
			<slot name="total"></slot>
		</div>
	</div>
</template>
<script>
	export default {
		name: "",
		data() {
			return {}
		},
		components: {},
		computed: {
			tableHeight() {
				if(!this.page) {
					return "100%";
				} else {
					return "calc(100% - 45px)";
				}
			},
		},
		watch: {},
		props: {
			list: {
				required: true,
				type: Array
			},
			column: {
				type: Array,
				required: true
			},
			height: {
				type: String
			},
			page: {
				required: true,
				type: [Object, Boolean],
				default: function() {
					return {
						PageIndex: 20,
						PageTotal: 0,
						PageSize: 1
					}
				}
			},
			rowStyle: {
				type: [Function, Object],
				default: function() {
					return {
						backgroundColor: "rgb(229, 235, 243)"
					}
				}
			},
			cellStyle: {
				type: [Function, Object],
				default: function() {
					return {
						// backgroundColor: "rgb(229, 235, 243)"
					}
				}
			},
			
			index: {
				type: Boolean,
				default: false
			},
			check: {
				type: Boolean,
				default: false
			},
			loading: {
				type: Boolean,
				default: false
			},
			rowClick: {
				type: Function,
				default: function(){}
			},
			summaryMethod: {
				type: Function,
				default: function(){}
			},
			showSummary: {
				type: Boolean,
				default: false
			},
			spanMethod: {
				type: Function,
				default: function(){}
			}
		},
		filters: {},
		created() {},
		mounted() {},
		methods: {
			handlePage(val) {
				this.$emit("page", val)
			},
			select(selection, row) {
				this.$emit("select", selection, row)
			},
			clear(){
				this.$refs["vtable"].clearSelection()
			},
			toggle(){
				this.$refs["vtable"].toggleAllSelection()
			}
		}
	}
</script>
<style scoped>
	.page {
		margin-top: 10px;
	}
	.v-table{
		position: relative;
	}
	.v-table .total{
		position: absolute;
		bottom: 9px;
		font-size: 14px;
		right: 200px;
	}
</style>