package miltour.back.controller;

import lombok.RequiredArgsConstructor;
import miltour.back.dto.request.member.MemberLoginDto;
import miltour.back.dto.request.member.MemberRegisterDto;
import miltour.back.dto.request.member.MemberUpdateDto;
import miltour.back.dto.response.member.MemberResponseDto;
import miltour.back.dto.response.member.MemberTokenDto;
import miltour.back.entity.Member;
import miltour.back.service.MemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @GetMapping("/checkId")
    public ResponseEntity<?> checkIdDuplicate(@RequestParam String email) {
        memberService.checkIdDuplicate(email);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/register")
    public ResponseEntity<MemberResponseDto> register(@RequestBody MemberRegisterDto memberRegisterDTO) {
        MemberResponseDto successMember = memberService.register(memberRegisterDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(successMember);
    }

    @PostMapping("/login")
    public ResponseEntity<MemberTokenDto> login(@RequestBody MemberLoginDto memberLoginDTO) {
        MemberTokenDto loginDTO = memberService.login(memberLoginDTO);
        return ResponseEntity.status(HttpStatus.OK).header(loginDTO.getToken()).body(loginDTO);
    }

    @PostMapping("/checkPwd")
    public ResponseEntity<MemberResponseDto> check(
            @AuthenticationPrincipal Member member,
            @RequestBody Map<String, String> request) {
        String password = request.get("password");
        MemberResponseDto memberInfo = memberService.check(member, password);
        return ResponseEntity.status(HttpStatus.OK).body(memberInfo);
    }

    @PutMapping("/update")
    public ResponseEntity<MemberResponseDto> update(
            @AuthenticationPrincipal Member member,
            @RequestBody MemberUpdateDto memberUpdateDTO) {
        MemberResponseDto memberUpdate = memberService.update(member, memberUpdateDTO);
        return ResponseEntity.status(HttpStatus.OK).body(memberUpdate);
    }

    @PostMapping("/{memberId}/favorites/{locationId}")
    public ResponseEntity<Void> addFavorite(@PathVariable Long memberId, @PathVariable Long locationId){
        memberService.addFavorite(memberId,locationId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @DeleteMapping("/{memberId}/favorites/{favoriteId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Long memberId, @PathVariable Long favoriteId){
        memberService.removeFavorite(memberId,favoriteId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
