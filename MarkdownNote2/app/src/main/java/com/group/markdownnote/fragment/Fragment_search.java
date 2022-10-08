package com.group.markdownnote.fragment;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ListView;
import android.widget.SearchView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.group.markdownnote.MainActivity;
import com.group.markdownnote.R;
import com.group.markdownnote.adapter.Fragment_search_Adapter;
import com.group.markdownnote.entity.MarkdownNote;
import com.group.markdownnote.entity.MyApp;

import java.util.ArrayList;
import java.util.List;


public class Fragment_search extends Fragment {
    private List<String> list;
    private List<String> list_search;
    private ArrayList<MarkdownNote> noteArrayList;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        noteArrayList = ((MyApp) requireActivity().getApplication()).getNoteArrayList();
        for (int i = 0; i < noteArrayList.size(); i++){
            Log.d("Fragment_index", "noteArrayList[" + i +"] = "+ noteArrayList.get(i).toString());
        }

        View view = inflater.inflate(R.layout.fragment_search, null);
        ListView mListView = view.findViewById(R.id.search_ListView);
        SearchView mSearchView = view.findViewById(R.id.searchView);

        //获取fragment_search的Activity---MainActivity
        MainActivity activity = (MainActivity) getActivity();

        //往list中添加元素
        listAdd();

        mSearchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                // 在这返回一个查找结果数组
                list_search = searchByQuery(query, list);
                mListView.setAdapter(new Fragment_search_Adapter(list_search, activity));
                return true;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
//                list_search = searchByQuery(newText, list);
//                mListView.setAdapter(new Fragment_search_Adapter(list_search, activity));
//                return true;
                return false;
            }
        });

        //设置适配器
        mListView.setAdapter(new Fragment_search_Adapter(list_search, activity));

        return view;
    }


    private void listAdd() {
        list = new ArrayList<>();

        List<String> str_title = new ArrayList<>();
        List<String> str_content = new ArrayList<>();
        List<String> str_id = new ArrayList<>();


        //将noteArrayList数组中的对应值赋值给str_title, str_content, str_title这三个数组
        for (int i = 0; i < noteArrayList.size(); i++) {
            str_title.add(noteArrayList.get(i).getTitle());
            str_content.add(noteArrayList.get(i).getContent());
            str_id.add(String.valueOf(noteArrayList.get(i).getId()));
        }

        //list用于综合存储上述三个数组的信息，按title content id的顺序依次存入
        if (str_title != null) {
            list.addAll(str_title);
        }

        if (str_content != null) {
            list.addAll(str_content);
        }

        if (str_id != null) {
            list.addAll(str_id);
        }
    }

    //检查content包不包含  list是包含所有东西的数组
    private List<String> searchByQuery(String query, List<String> list) {
        list_search = new ArrayList<>();
        List<Integer> index_list = new ArrayList<>();

        if (!list.isEmpty()) {
            //检查content包不包含
            for (int i = list.size() / 3; i < list.size() * 2 / 3; i++) {
                String str = list.get(i);
//                Log.d("searchByQuery", "str: " + str);
                if (findString(str, query)) {
                    index_list.add((i - list.size() / 3));
                }
            }
            for(int i = 0; i < index_list.size(); i++) {
                Log.d("searchByQuery", "index_list.get(i): " + index_list.get(i));
            }
        }

        if (!index_list.isEmpty()) {
            int length = list.size() / 3;
            for(int i = 0; i < index_list.size(); i++){
                int index = index_list.get(i);
                list_search.add(list.get(index));
            }
            for(int i = 0; i < index_list.size(); i++){
                int index = index_list.get(i);
                list_search.add(list.get(index + length));
            }
            for(int i = 0; i < index_list.size(); i++){
                int index = index_list.get(i);
                list_search.add(list.get(index + 2 * length));
            }

            for(int i = 0; i < list_search.size(); i++) {
                Log.d("searchByQuery", "list_search.list_search.get(i): " + list_search.get(i));
            }
        }
        return list_search;
    }

    //判断String字符串中包含某个字段
    private static boolean findString(String mString, String query) {
        if (!mString.isEmpty()) {
            if (mString.contains(query)) {
                return true;
            }
        }
        return false;
    }
}
