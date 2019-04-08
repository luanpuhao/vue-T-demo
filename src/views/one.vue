<template>
	<div>

		<div class="findBox">
			<div>
				<el-input placeholder="企业名称" v-model="companyName" size="small" clearable >
	
				</el-input>
			</div>
			<div>
				<el-input placeholder="项目名称" v-model="projectName" size="small"  clearable >
	
				</el-input>
			</div>
			<div>
				<el-select v-model="place" clearable placeholder="所属区域" size="small" >
	
					<el-option value="1">
	
						阿斯蒂芬
	
					</el-option>
	
				</el-select>
			</div>
			<div>
				<el-select v-model="state" clearable placeholder="缴费类别" size="small" >
	
					<el-option value="2">
	
						阿斯蒂芬
	
					</el-option>
	
				</el-select>
			</div>
			

			<div>
				<div class="block">
	
					<el-date-picker   v-model="timeList" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small">
	
					</el-date-picker>
	
				</div>
			</div>
			<div class="btn">
				<el-button type="success" size="small" >查询</el-button>
			</div>

		</div>

	
	
			<div class="tableBox">
				<div>
					<span class="iconfont">&#xe63a;</span>
					下载勘察单
				</div>
			</div>
	
			
			<v-table   check @page="handlePage" :page="page" :list="tableData" :column="column" height="calc(100% - 140px)">
				<template slot="button" slot-scope="{ row }" >
					<el-button size="mini" type="text" @click="handle(row,true)">编辑</el-button>
				</template>
			</v-table>
	</div>
</template>

<script>
	export default {
	
		data() {
	
			return {
				companyName: '',
				projectName: '',
				place: '',
				state: '',
				timeList: '',
				check:true,
				page: {
					PageIndex: 1,
					PageTotal: 0,
					PageSize: 20
				},
				column: [{
					label: "企业名称",
					prop: "date",
					width: ""
				}, {
					label: "项目名称",
					prop: "gender",
					width: "80"
				}, {
					label: "所属区域",
					prop: "worktype_name"
				}, {
					label: "摄像头数量",
					prop: "id_card_no",
					width: "120"
				}, {
					label: "总计",
					prop: "date",
					width: "160",
					tooltip: true
				}, {
					label: "状态",
					prop: "county_name"
				}, {
					label: "设备箱子是否已挂",
					prop: "company_name",
					width: "160",
				}, {
					label: "不良行勘察日期为",
					prop: "BadGradeCount"
				}, {
					label: "备注",
					prop: "BadGradeCount"
				}, {
					label: "操作",
					prop: "lid",
					width: "180",
					slot: "button"
				}],
				tableData: [{
	
					date: '2016-05-03',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				}, {
	
					date: '2016-05-02',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				}, {
	
					date: '2016-05-02',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				},{
	
					date: '2016-05-02',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				},{
	
					date: '2016-05-02',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				},{
	
					date: '2016-05-02',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				},{
	
					date: '2016-05-02',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				},{
	
					date: '2016-05-02',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				},{
	
					date: '2016-05-02',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				},{
	
					date: '2016-05-02',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				},{
	
					date: '2016-05-02',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				},{
	
					date: '2016-05-02',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				},{
	
					date: '2016-05-02',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				}, {
	
					date: '2016-05-01',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				}, {
	
					date: '2016-05-01',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				}, {
	
					date: '2016-05-01',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				}, {
	
					date: '2016-05-01',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				}, {
	
					date: '2016-05-01',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				}, {
	
					date: '2016-05-01',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				}, {
	
					date: '2016-05-01',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				}, {
	
					date: '2016-05-01',
	
					name: '王小虎',
	
					province: '上海',
	
					city: '普陀区',
	
					address: ' 1518 弄',
	
					zip: 200333
	
				}]
	
			}
		},
		
			methods: {
			
			handlePage(val) {
				this.dialog = false;
				this.page.PageIndex = val;
				this.init();
			},
			}
	
	}
</script>

<style scoped>
	.w180 {
	
		width: 194px;
	
	}
	.findBox{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		line-height: 32px;
		font-size: 14px;
	}
	.findBox div{
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		line-height: 32px;
		font-size: 14px;
		margin-right: 10px;
		height: 30px;
		margin-bottom: 10px;

	}
</style>