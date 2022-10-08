package com.group.markdownnote.fragment;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ListView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.group.markdownnote.MainActivity;
import com.group.markdownnote.R;
import com.group.markdownnote.adapter.Fragment_index_Adapter;
import com.group.markdownnote.entity.MarkdownNote;
import com.group.markdownnote.entity.MyApp;
import com.group.markdownnote.utils.ToastUtils;

import java.util.ArrayList;
import java.util.List;

public class Fragment_index extends Fragment{
    private List<String> list;

    private ArrayList<MarkdownNote> noteArrayList;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        noteArrayList = ((MyApp) requireActivity().getApplication()).getNoteArrayList();
//        for (int i = 0; i < noteArrayList.size(); i++){
//            Log.d("Fragment_index", "noteArrayList[" + i +"] = "+ noteArrayList.get(i).toString());
//        }

        @SuppressLint("InflateParams")
        View view = inflater.inflate(R.layout.fragment_index, null);
        ListView mListView = view.findViewById(R.id.lv_fragment_index);

        //获取fragment_index的Activity---MainActivity
        MainActivity activity = (MainActivity) getActivity();

        //往list中添加元素
        listAdd();

        //设置适配器
        mListView.setAdapter(new Fragment_index_Adapter(list, activity));

        //长按删除
        mListView.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {

            @Override
            public boolean onItemLongClick(AdapterView<?> parent, View view, int position, long id) {
                AlertDialog.Builder builder = new AlertDialog.Builder(activity);
                builder.setTitle("提示！");
                builder.setMessage("是否删除？");
                builder.setPositiveButton("是(Yes)", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        Log.d("setOnItemLongClickListener", "onClick: position= "+position);
                        noteArrayList.remove(position);//删除
                        ((MyApp) requireActivity().getApplication()).setNoteArrayList(noteArrayList);
                        listAdd();//重新获取list
                        mListView.setAdapter(new Fragment_index_Adapter(list, activity));//数据刷新
                    }
                });
                builder.setNegativeButton("否(No)", null);
                builder.create().show();

                return true;
            }
        });

        //点击修改
        mListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {

            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                ToastUtils.showToastNoImage(getActivity(), "点击第" + (position + 1) + "个笔记");
            }
        });
        mListView.setAdapter(new Fragment_index_Adapter(list, activity));//数据刷新

        return view;
    }

    private void listAdd() {
        list = new ArrayList<>();

        List<String> str_title = new ArrayList<>();
        List<String> str_content = new ArrayList<>();
        List<String> str_id = new ArrayList<>();

        //将noteArrayList数组中的对应值赋值给str_title, str_content, str_title这三个数组[给的短的值，免得主页显示文字太多]
        for (int i = 0; i < noteArrayList.size(); i++) {
            str_title.add(noteArrayList.get(i).getShortTitle());
            str_content.add(noteArrayList.get(i).getShortContent());
            str_id.add(String.valueOf(noteArrayList.get(i).getId()));
        }

        //list用于综合存储上述三个数组的信息，按title content id的顺序依次存入
        if (str_title !=null){
            list.addAll(str_title);
        }

        if (str_content !=null) {
            list.addAll(str_content);
        }

        if (str_id !=null){
            list.addAll(str_id);
        }

/* *       if (str_title!=null){
            for(int i = 0; i < str_title.size(); i++){
                list.add(str_title.get(i));
            }
        }

        if (str_content!=null) {
            for (int i = 0; i < str_content.size(); i++) {
                list.add(str_content.get(i));
            }
        }

        if (str_id!=null){
            for(int i = 0; i < str_id.size(); i++){
                list.add(str_id.get(i));
            }
        }*/

    }

}
