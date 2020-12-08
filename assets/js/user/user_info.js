$(function() {
    initUserInfo();
    //从 layui 获取 form 对象
    var form = layui.form;
    var layer = layui.layer;
    //通过lay-verify（）自定义效验规则
    form.verify({
            // 昵称效验规则
            nickname: function(value) {
                if (value.length > 6) {
                    return '昵称长度保持在 1 ~ 6 个字符'
                }
            },
            // 邮箱验证规则
            email: [/^\w+@\w+([-]\w+)*(\.\w+)+$/, '邮箱格式有误']
        })
        // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return '获取用户基本信息失败'
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 重置表单事件
    $('#btn_clear').on('click', function(e) {
            // 阻止表单的默认提交行为
            e.preventDefault();
            //调用用户基本信息初始化函数
            initUserInfo();
        })
        //监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        //阻止表单的默认提交
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('提交成功！')
                window.parent.getUserInfo();
            }
        })
    })
})