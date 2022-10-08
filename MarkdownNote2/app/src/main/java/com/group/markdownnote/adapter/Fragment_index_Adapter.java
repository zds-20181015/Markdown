package com.group.markdownnote.adapter;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.group.markdownnote.AddMarkdownNoteActivity;
import com.group.markdownnote.ModifyMarkdownNoteActivity;
import com.group.markdownnote.R;
import com.group.markdownnote.entity.MarkdownNote;
import com.group.markdownnote.entity.MyApp;

import java.util.ArrayList;
import java.util.List;

public class Fragment_index_Adapter extends BaseAdapter {
    private List<String> list;
    private Context context;

    public Fragment_index_Adapter(List<String> list,Context context){
        this.list = list;
        this.context = context;
    }

    @Override
    public int getCount() {
        return list!=null ? list.size()/3 : 0; //string数组长度的一半 因为装了标题和内容两部分[存几部分除以几 这边又加了个id]
    }

    @Override
    public Object getItem(int position) {
        return list.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder mHolder = null;

        if(convertView == null){
            mHolder = new ViewHolder();
            convertView = LayoutInflater.from(context).inflate(R.layout.item_index, null);
            mHolder.tv_item_title = convertView.findViewById(R.id.tv_item_title);
            mHolder.tv_item_content = convertView.findViewById(R.id.tv_item_content);
            mHolder.tv_item_id = convertView.findViewById(R.id.tv_item_id);
            convertView.setTag(mHolder);
        }else{
            mHolder = (ViewHolder) convertView.getTag();
        }
        mHolder.tv_item_title.setText(list.get(position));
        mHolder.tv_item_content.setText(list.get(position + getCount()));//这里的getCount() 对应Fragment_index中的string数组长度的一半 因为装了标题和内容两部分 三分之一
        mHolder.tv_item_id.setText(list.get(position + getCount() * 2));

        //点击事件 传值
        mHolder.tv_item_content.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                //传值
                Intent intent=new Intent(context, ModifyMarkdownNoteActivity.class);
                Bundle bundle=new Bundle();
                bundle.putSerializable("key_position",position);
                intent.putExtras(bundle);

                //跳转
                context.startActivity(intent);
            }
        });

        return convertView;
    }

    final static class ViewHolder{
        TextView tv_item_title;
        TextView tv_item_content;
        TextView tv_item_id;
    }
}


