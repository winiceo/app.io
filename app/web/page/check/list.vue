<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" placeholder="奖品" v-model="listQuery.title">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 100px;" class="filter-item" placeholder="中奖人" v-model="listQuery.nickname">
      </el-input>



      <el-select @change='handleFilter' style="width: 120px" class="filter-item" v-model="listQuery.sort" placeholder="排序">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>


      <el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>
     </div>

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">

      <!--<el-table-column align="center" label="序号" width="65">-->
        <!--<template scope="scope">-->
          <!--<span>{{scope.row.objectId}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column width="120px" align="center" label="中奖时间">
        <template scope="scope">
          <span>{{scope.row.createdAt }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="奖项">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.draw.grade}}</span>
         </template>
      </el-table-column>
      <el-table-column min-width="200px" label="奖品名称">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.draw.name}}</span>
         </template>
      </el-table-column>
      <el-table-column min-width="200px" label="中奖人">
        <template scope="scope">
          <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.nickname}}</span>
         </template>
      </el-table-column> 
      <el-table-column class-name="status-col" label="状态" width="90">
        <template scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="280">
        <template scope="scope">
          <el-button   size="small" type="success" @click="showPreView(scope.row)">预览
          </el-button>

          <el-button v-if="scope.row.status!='published'" size="small" type="success" @click="handleModifyStatus(scope.row,'published')">发布
          </el-button>
          <el-button v-if="scope.row.status!='published'" size="small" @click="update(scope.row)">编辑
          </el-button>
          <el-button v-if="scope.row.status!='deleted'" size="small" type="danger" @click="delete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="temp" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>


        <el-form-item label="状态">
          <el-select class="filter-item" v-model="temp.status" placeholder="请选择">
            <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="时间">
          <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="标题">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>

        <el-form-item label="重要性">
          <el-rate style="margin-top:8px;" v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"></el-rate>
        </el-form-item>

        <el-form-item label="点评">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="temp.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create">确 定</el-button>
        <el-button v-else type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="阅读数统计" :visible.sync="dialogPvVisible" size="small">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="渠道"> </el-table-column>
        <el-table-column prop="pv" label="pv"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <PreView :item="item" @hideView="isShowPreView=false" v-if="isShowPreView"/>
  </div>
</template>

<script>
    import * as http from '@/api/check'
    import  * as api from '@/api/activity'
    import waves from '@/framework/vue/directive/waves.js'// 水波纹指令

    import { parseTime } from '@/utils'
    import PreView from '@/components/PreView'



    export default {
        components: {
             PreView
        },
        name: 'table_demo',
        directives: {
          waves
        },
        data() {
            return {
                item:{},
                isShowPreView: false,
                itemId: null,
                list: null,
                total: null,
                listLoading: true,
                listQuery: {
                    cate:'dzp',
                    page: 1,
                    limit: 20,

                    title: undefined,
                    nickname: undefined,
                    sort: '+id'
                },
                temp: {
                    id: undefined,
                    importance: 0,
                    remark: '',
                    timestamp: 0,
                    title: '',
                    type: '',
                    status: 'published'
                },
                importanceOptions: [1, 2, 3],

                sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
                statusOptions: ['published', 'draft', 'deleted'],
                dialogFormVisible: false,
                dialogStatus: '',
                textMap: {
                    update: '编辑',
                    create: '创建'
                },
                dialogPvVisible: false,
                pvData: [],
                showAuditor: false,
                tableKey: 0
            }
        },
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'gray',
                    deleted: 'danger'
                }
                return statusMap[status]
            },
            typeFilter(type) {
                return calendarTypeKeyValue[type]
            }
        },
        created() {
            this.getList()
        },
        methods: {
            showPreView (item) {
                this.isShowPreView = true
                this.item = item
            },
            getList() {
                this.listLoading = true
                http.query(this.listQuery).then(data => {
                    this.list = data.items
                    this.total = data.total
                    this.listLoading = false
                })
            },
            handleFilter() {
                this.getList()
            },
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            timeFilter(time) {
                if (!time[0]) {
                    this.listQuery.start = undefined
                    this.listQuery.end = undefined
                    return
                }
                this.listQuery.start = parseInt(+time[0] / 1000)
                this.listQuery.end = parseInt((+time[1] + 3600 * 1000 * 24) / 1000)
            },
            handleModifyStatus(row, status) {
                this.$message({
                    message: '操作成功',
                    type: 'success'
                })
                row.status = status
            },
            handleCreate() {
                this.resetTemp()
                this.dialogStatus = 'create'
                this.dialogFormVisible = true
            },
            handleUpdate(row) {
                this.temp = Object.assign({}, row)
                this.dialogStatus = 'update'
                this.dialogFormVisible = true
            },
            handleDelete(row) {
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success',
                    duration: 2000
                })
                const index = this.list.indexOf(row)
                this.list.splice(index, 1)
            },
            create() {
                this.temp.id = parseInt(Math.random() * 100) + 1024
                this.temp.timestamp = +new Date()
                this.temp.author = '原创作者'
                this.list.unshift(this.temp)
                this.dialogFormVisible = false
                this.$notify({
                    title: '成功',
                    message: '创建成功',
                    type: 'success',
                    duration: 2000
                })
            },
            update(item) {
                this.$router.push({ path: 'dzp/edit/'+item.objectId })
            },
            delete(item){

            },
            resetTemp() {
                this.temp = {
                    id: undefined,
                    importance: 0,
                    remark: '',
                    timestamp: 0,
                    title: '',
                    status: 'published',
                    type: ''
                }
            },
            handleFetchPv(pv) {
                //fetchPv(pv).then(response => {
                    this.pvData = 333
                    this.dialogPvVisible = true
               // })
            },
            handleDownload() {
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/vendor/Export2Excel')
                    const tHeader = ['时间', '地区', '类型', '标题', '重要性']
                    const filterVal = ['timestamp', 'province', 'type', 'title', 'importance']
                    const data = this.formatJson(filterVal, this.list)
                    export_json_to_excel(tHeader, data, 'table数据')
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    if (j === 'timestamp') {
                        return parseTime(v[j])
                    } else {
                        return v[j]
                    }
                }))
            }
        }
    }
</script>
