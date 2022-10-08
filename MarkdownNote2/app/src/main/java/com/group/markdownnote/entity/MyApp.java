package com.group.markdownnote.entity;

import android.app.Application;
import android.util.Log;

import com.group.markdownnote.MainActivity;

import java.util.ArrayList;
import java.util.Date;

public class MyApp extends Application {
    private static final String TAG = MyApp.class.getName();
    public ArrayList<MarkdownNote> noteArrayList;
    public int id;

    public ArrayList<MarkdownNote> getNoteArrayList() {
        return noteArrayList;
    }

    public void setNoteArrayList(ArrayList<MarkdownNote> noteArrayList) {
        this.noteArrayList = noteArrayList;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        if (noteArrayList==null){
            noteArrayList = new ArrayList<MarkdownNote>();


            noteArrayList.add(new MarkdownNote(0, new Date(),
                    "内容一：假如人生不曾相遇，我还是那个我，偶尔做做梦，然后，开始日复一日的奔波，淹没在这喧嚣的城市里。" +
                            "我不会了解，这个世界还有这样的一个你，只有你能让人回味，也只有你会让我心醉。假如人生不曾相遇，我不会相信，" +
                            "有一种人可以百看不厌，有一种人一认识就觉得温馨。", "假如", null));
            noteArrayList.add(new MarkdownNote(1, new Date(), "内容二：醉相忘，何当缠眷；堪怜寂夜，疏影话凄凉。千" +
                    "年缘识，今生情惆；载不动，许多愁，欲语泪先流在不老的夜里，串起你温润的片言碎语，折叠成唐宋，铺衬今夜的文字。一种情缘只能" +
                    "遥寄梦里，而我，化成梦里的蝴蝶，在瘦长的月光中等待黎明的瞬刻，共舞。\n", "醉相忘", null));
            noteArrayList.add(new MarkdownNote(2, new Date(), "内容三：年华无恙，岁月无伤，守一笺小字的清凉，浅读风的忧伤，" +
                    "深念雨的温良。遥望风烟俱净，是内心独守的一方晴空。将岁月静好，缱绻于指间，晕染成一朵安静的芬芳，开在心上，静静地绽放成幸福的模样！" +
                    "把一盏茶缘，细细临摹，慢慢勾勒，定格成此生不眠的画卷。", "年华无恙", null));
            id = 3;
//            Log.d(TAG, "onCreate:id, noteArrayList = "+ id + noteArrayList);
        }
//        Log.d(TAG, "onCreate: !!!!!!!!!!!");
    }
}
