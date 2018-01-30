<template>
    <Row id="taskListRow">
        <Col span="10" offset="7">
            <Button type="primary" size="small" @click="addTask">添加任务</Button>
            <Button type="primary" size="small" @click="bulkComplete">完成任务</Button>
            <Button type="ghost" size="small" @click="bulkRemove">删除任务</Button>

            <Row v-show="showNewTaskInput" class="mar-t20">
                <Input type="text" class="w220" v-model="newTask.name" ></Input>
                <Button type="primary" @click="submitTask">提交</Button>
            </Row>

            <div class="mar-t20 list-box">
                <h2>任务列表 ( {{ taskCount }} )  </h2>
                <Row v-for="(item,index) in taskList" :key="index" :gutter="10">
                    <Col span="16" class="text-left">
                        <Checkbox v-model="item.selected" @on-change="selectTask(index)" ></Checkbox>  <span>{{index}}</span> <span :class="{'completed':item.completed}">{{item.name}}</span>
                    </Col>
                    <Col span="8" class="pull-right">
                        <Button type="primary" size="small" @click="complete(index)">完成</Button>
                        <Button type="ghost" size="small" @click="remove(index)">删除</Button>
                    </Col>
                </Row>
            </div>
        </Col>
    </Row>
</template>
<script>
    export default{
            name:'taskList',
            data(){
                return {
                    taskList:[

                    ],
                    showNewTaskInput:false,
                    newTask:{ name:'',completed:false,selected:false },
                    selected:[]
                }
            },
            computed:{
                taskCount(){
                    return this.taskList.length;
                }
            },
            mounted(){
                console.log( $('#taskListRow').html() );
//                this.$http.get('/taskList/detail').then((res)=>{
//
//                });
                this.$http.get('/taskList').then((res)=>{
                    this.taskList = res.data;
                })
            },
            methods:{
                addTask(){
                    this.showNewTaskInput = true;
                },
                submitTask(){
                    //提交不得为空
                    if( this.newTask.name == '' ){
                        this.$Message.error('任务名称不得为空');
                        return;
                    }
                    this.taskList.unshift(this.newTask);
                    this.showNewTaskInput = false;
                    this.newTask = { name:'' , completed:false , selected:false };
                },
                remove(index){
                    this.taskList.splice(index,1);
                },
                complete(index){
                    this.taskList[index].completed = true;
                },
                selectTask(index){
                    if ( this.taskList[index].selected ){
                        this.selected.push( this.taskList[index] );
                    }else{
                        this.selected = _.without( this.selected, this.taskList[index] );
                    }
                },
                bulkComplete(){
                    this.selected = _.map( this.selected,function(item){
                        item.completed = true;
                        return item;
                    });
                },
                bulkRemove(){
                    this.taskList = _.difference(this.taskList,this.selected);
                }
            }

    }
</script>
<style>
    #app{
        margin:40px auto;
    }
    .mar-t20{margin-top:20px;}
    .ivu-row{
        clear:both;
        padding: 4px 0px;
        line-height:28px;
    }
    .list-box .ivu-row{
        border-bottom:1px solid #ddd;
    }
    .w220{
        width:220px!important;
    }
    .text-left{
        text-align:left;
    }
    .completed{
        color:#14b714;
        text-decoration:line-through;
    }
</style>