$(function() {
    //从 layui 获取 form 对象
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        //自定义一个pwsd效验规则
        pwsd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function(value) {
            var pwd = $('#reg_pwd [name=newPwd]').val();
            if (pwd !== value) {
                return '两次输入的密码不一致'
            }
        },
        newpwsd: function(value) {
            var newpwd = $('#reg_pwd [name=oldPwd]').val();
            if (newpwd === value) {
                return '新密码不能与旧密码相同'
            }
        }
    })
    $('#reg_pwd').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('重置密码失败！！')
                }
                layer.msg('重置密码成功！！')
                $('#reg_pwd')[0].reset();
            }
        })
    })
})