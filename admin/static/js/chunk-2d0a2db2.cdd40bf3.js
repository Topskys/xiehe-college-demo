(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a2db2"],{"0062":function(e,t,r){"use strict";r.r(t);r("b0c0");var a=function(){var e=this,t=e._self._c;return t("div",{staticClass:"app-container"},[t("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.formLoading,expression:"formLoading"}],ref:"form",attrs:{model:e.form,rules:e.formRules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"名称：",required:"",prop:"name"}},[t("el-input",{model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1),t("el-form-item",{attrs:{label:"创建时间：",required:"",prop:"dateTime"}},[t("el-input",{model:{value:e.form.dateTime,callback:function(t){e.$set(e.form,"dateTime",t)},expression:"form.dateTime"}})],1),t("el-form-item",{attrs:{label:"题型：",required:"",prop:"type"}},[t("el-select",{model:{value:e.form.type,callback:function(t){e.$set(e.form,"type",t)},expression:"form.type"}},e._l(e.types,(function(e){return t("el-option",{key:e.key,attrs:{value:e.value,label:e.value}})})),1)],1),t("el-form-item",{attrs:{label:"考点：",required:"",prop:"config"}},[t("el-select",{attrs:{multiple:""},model:{value:e.form.config,callback:function(t){e.$set(e.form,"config",t)},expression:"form.config"}},e._l(e.configs,(function(e){return t("el-option",{key:e.key,attrs:{label:e.value,value:e.value}})})),1)],1),t("el-form-item",{attrs:{label:"问题：",required:"",prop:"question"}},[t("el-input",{attrs:{type:"textarea"},model:{value:e.form.question,callback:function(t){e.$set(e.form,"question",t)},expression:"form.question"}})],1),t("el-form-item",{attrs:{label:"答案解答：",required:"",prop:"answer"}},[t("el-input",{attrs:{type:"textarea"},model:{value:e.form.answer,callback:function(t){e.$set(e.form,"answer",t)},expression:"form.answer"}})],1),t("el-form-item",{attrs:{label:"上传材料：",align:"center"}},[t("el-upload",{staticClass:"upload-demo",attrs:{drag:"",action:"https://jsonplaceholder.typicode.com/posts/",multiple:""}},[t("i",{staticClass:"el-icon-upload"}),t("div",{staticClass:"el-upload__text"},[e._v("将文件拖到此处，或"),t("em",[e._v("点击上传")])])])],1),t("el-form-item",[t("el-button",{attrs:{type:"primary"},on:{click:e.submitForm}},[e._v("提交")]),t("el-button",{on:{click:e.resetForm}},[e._v("重置")])],1)],1)],1)},o=[],i=r("5530"),s=r("2f62"),l=(r("c418"),{data:function(){return{form:{name:"",type:"Access",question:"无",answer:"有",config:"第一章",createTime:"".concat(new Date)},formLoading:!1,types:[{value:"Word",key:0},{value:"Excel",key:1},{value:"Access",key:2},{value:"Windows",key:3},{value:"IE",key:4},{value:"EMail",key:5},{value:"网络操作",key:6}],configs:[{value:"第一章",key:0},{value:"第二章",key:1},{value:"第三章",key:2},{value:"第四章",key:3}],id:-1,videoFlag:!1,videoUploadPercent:"",isShowUploadVideo:!1,videoForm:{showVideoPath:""},formRules:{name:[{required:!0,message:"不能为空",trigger:"blur"}],type:[{required:!0,message:"不能为空",trigger:"blur"}],question:[{required:!0,message:"不能为空",trigger:"blur"}],answer:[{required:!0,message:"不能为空",trigger:"blur"}],config:[{required:!0,message:"不能为空",trigger:"blur"}],createTime:[{required:!0,message:"不能为空",trigger:"blur"}]}}},created:function(){if(this.$route.query.data){var e=JSON.parse(this.$route.query.data);this.id=parseInt(e);var t=this;t.formLoading=!0;var r=t.$getStorage("operate_list");t.form=r[t.id],t.formLoading=!1}},methods:Object(i["a"])({submitForm:function(){var e=this,t=this;this.$refs.form.validate((function(r){if(r){if(t.formLoading=!0,t.form&&-1!=t.id){var a=t.$getStorage("operate_list");a[t.id]=t.form,t.$setStorage("operate_list",a),t.$message.success("修改成功"),t.$router.push("/topic/operate/list")}else if(t.form){a=t.$getStorage("operate_list");a.push(t.form),t.$setStorage("operate_list",a),t.$message.success("提交成功"),t.$router.push("/topic/operate/list")}}else e.$message.warning("请填写完整")}))},resetForm:function(){this.form.id;this.$refs["form"].resetFields(),this.form={name:"",type:"",question:"",config:"",answer:"",createTime:"".concat(new Date)}}},Object(s["b"])("tagsView",{delCurrentView:"delCurrentView"})),computed:Object(i["a"])(Object(i["a"])({},Object(s["c"])("enumItem",["enumFormat"])),Object(s["e"])("enumItem",{levelEnum:function(e){return e.user.levelEnum}}))}),n=l,u=r("2877"),m=Object(u["a"])(n,a,o,!1,null,null,null);t["default"]=m.exports}}]);