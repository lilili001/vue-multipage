<template>
    <div>
        <div>list page app vue</div>
        <Button>sdf</Button>
    </div>
</template>
<script>
    export default{
        data(){
            return {

            }
        },
        mounted(){
            console.log( $('body').html() );
            const arr = [1,2,3,4];
            let arr1 = _.map(arr,(item)=>{
                return item*2
            });
            console.log(arr1);
        }
    }
</script>
<style>
    body{
        background:#e8e8e8;
    }
</style>