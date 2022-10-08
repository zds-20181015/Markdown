package com.group.markdownnote.fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.group.markdownnote.MainActivity;
import com.group.markdownnote.R;
import com.group.markdownnote.utils.ToastUtils;

public class Fragment_my extends Fragment {

    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_my, null);
        MainActivity activity = (MainActivity) getActivity();

        final TextView vision_tv = view.findViewById(R.id.vision_tv);
        final TextView about_us_tv = view.findViewById(R.id.about_us_tv);
        final TextView setup_tv = view.findViewById(R.id.setup_tv);

        vision_tv.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                ToastUtils.showToast(activity,"版本号：v1.2.1");
            }
        });

        about_us_tv.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                ToastUtils.showToast(activity,"终端小队：你说的都队");
            }
        });

        setup_tv.setOnClickListener(new View.OnClickListener(){
            @Override
            public void onClick(View v) {
                ToastUtils.showToast(activity,"设置");
            }
        });
        return view;
    }

}
