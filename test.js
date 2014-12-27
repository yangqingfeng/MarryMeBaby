/**
 * Created by Issac on 2014/12/15.
 */

var ajaxQueue = function (options) {
    options.agencyId = 2; //测试所用
    var ajaxQueuer = $.ajaxQueuer([
            {
                type: "post",
                async: true,
                dataType: "json",
                contentType: "application/json, charset=utf-8",
                data: {Id: parseInt(options.deserializeId)},
                url: options.deserializeUrl,
                success: function (data, status, xhr, queue, ajaxOptions) {
                    data = $.parseJSON(data);
                    if (data.IsSuccess && data.Result.total > 0) {
                        data = data.Result.rows[0];
                        if (options.deserializeCallBack) {
                            options.deserializeCallBack(data);
                            options.modifyRowData = data;
                        }
                    }
                }
            },
            {
                type: "post",
                async: true,
                dataType: "json",
                contentType: "application/json, charset=utf-8",
                url: typeof(options.getSupervisorUrl) == "undefined" ? "/AdminLawEnforce/Supervise/GetSupervisorByAgencyId" : options.getSupervisorUrl,
                data: {agencyId: options.agencyId},
                success: function (data, status, xhr, queue, ajaxOptions) {
                    data = $.parseJSON(data);
                    if (data.IsSuccess) {
                        options.supervisors = data.Result.rows;
                        if (options.initSupervisorCallBack) {
                            options.initSupervisorCallBack(options.isModify, options.supervisors,
                                options.modifyRowData);
                        } else {
                            if (options.isModify && options.modifyRowData) {
                                $('#RecordForm').adminLawForm('initCombobox', "Supervisor1", options.supervisors, "Supervisor1CardNo",
                                    loadSuccessCallBack(options.isModify, "Supervisor1", options.modifyRowData.Supervisor1Id));
                                $('#RecordForm').adminLawForm('initCombobox', "Supervisor2", options.supervisors, "Supervisor2CardNo",
                                    loadSuccessCallBack(options.isModify, "Supervisor2", options.modifyRowData.Supervisor2Id));
                            } else {
                                $('#RecordForm').adminLawForm('initCombobox', "Supervisor1", options.supervisors, "Supervisor1CardNo");
                                $('#RecordForm').adminLawForm('initCombobox', "Supervisor2", options.supervisors, "Supervisor2CardNo");
                            }
                        }
                    }
                }
            }
        ]
    );
};

(function () {
    window.BMap_loadScriptTime = (new Date).getTime();
    window.BMap = window.BMap || {};
    window.BMap.apiLoad = function () {
        delete window.BMap.apiLoad;
        if (typeof initMap == "function") {
            initMap()
        }
    };
    var s = document.createElement('script');
    s.src = 'http://api.map.baidu.com/getscript?v=1.2&ak=&services=&t=20130716024057';
    document.body.appendChild(s);
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', 'http://api.map.baidu.com/res/12/bmap.css');
    document.getElementsByTagName('head')[0].appendChild(link);
})();
