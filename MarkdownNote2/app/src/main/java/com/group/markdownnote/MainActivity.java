package com.group.markdownnote;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.viewpager.widget.ViewPager;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.group.markdownnote.adapter.FragmentAdapter;
import com.group.markdownnote.entity.MarkdownNote;
import com.group.markdownnote.entity.MyApp;
import com.group.markdownnote.fragment.Fragment_index;
import com.group.markdownnote.fragment.Fragment_my;
import com.group.markdownnote.fragment.Fragment_search;
import com.group.markdownnote.utils.ToastUtils;

import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity implements View.OnClickListener,BottomNavigationView.OnNavigationItemSelectedListener, ViewPager.OnPageChangeListener {
    private static final String TAG = MainActivity.class.getName();

    private ImageButton ib_addBut;
    private TextView tv_title;

    private MyApp mApp;
    private ArrayList<MarkdownNote> noteArrayList;

    private ViewPager mViewPager;
    private BottomNavigationView mBottom;
    private FragmentManager manager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mApp = (MyApp) getApplication();
        noteArrayList = mApp.getNoteArrayList();
        for (int i = 0; i < noteArrayList.size(); i++){
            Log.d(TAG, "noteArrayList[" + i +"] = "+ noteArrayList.get(i).toString());
        }
        initUI();

    }

    //初始化组件以及加监听
    private void initUI() {
        List<Fragment> mList = new ArrayList<>();

        tv_title = findViewById(R.id.title);
        ib_addBut = findViewById(R.id.addBut);

        tv_title.setOnClickListener(this);
        ib_addBut.setOnClickListener(this);

        mViewPager = findViewById(R.id.viewPager);
        manager = getSupportFragmentManager();

        mBottom = findViewById(R.id.bottom);
        mBottom.setSelectedItemId(R.id.menu_index);
        mBottom.setOnNavigationItemSelectedListener(this);

        //向mList中添加三个fragment
        Fragment_index index = new Fragment_index();
        Fragment_search search = new Fragment_search();
        Fragment_my my = new Fragment_my();
        mList.add(index);
        mList.add(search);
        mList.add(my);

        //添加适配器
        FragmentAdapter adapter = new FragmentAdapter(manager, 0, mList);
        mViewPager.setAdapter(adapter);
        mViewPager.addOnPageChangeListener(this);

    }

    @SuppressLint("NonConstantResourceId")
    @Override
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.addBut:{
                ToastUtils.showToastNoImage(getApplicationContext(),"准备添加新的Markdown Note...");
                Intent intent = new Intent(getApplicationContext(), AddMarkdownNoteActivity.class);
                startActivity(intent);
                break;
            }
            case R.id.title:{
                tv_title.setText(getString(R.string.markdown_note));
                for (int i = 0; i < noteArrayList.size(); i++){
                    Log.d(TAG, "noteArrayList[" + i +"] = "+ noteArrayList.get(i).toString());
                }
                break;
            }
            default:
                break;
        }
    }

    @Override
    public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

    }

    //顶部title 修改textview组件成对应的分页
    @Override
    public void onPageSelected(int position) {
        if(position == 0){
            tv_title.setText(getString(R.string.index));
        }else{
            tv_title.setTextColor(Color.BLACK);
        }if(position == 1){
            tv_title.setText(getString(R.string.search));
        }else{
            tv_title.setTextColor(Color.BLACK);
        }if(position == 2){
            tv_title.setText(getString(R.string.my));
        }else {
            tv_title.setTextColor(Color.BLACK);
        }
        mBottom.getMenu().getItem(position).setChecked(true);
    }

    @Override
    public void onPageScrollStateChanged(int state) {

    }

    //底部导航栏
    @SuppressLint("NonConstantResourceId")
    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        switch (item.getItemId()) {
            case R.id.menu_index:
                mViewPager.setCurrentItem(0);
                return true;
            case R.id.menu_search:
                mViewPager.setCurrentItem(1);
                return true;
            case R.id.menu_my:
                mViewPager.setCurrentItem(2);
                return true;
        }
        return false;
    }
}