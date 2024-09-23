<template>
  <div class="team-card">
    <div class="card-content">
      <t-image :src="teamImage" alt="队伍图片" class="team-image" />
      <div class="team-info">
        <span class="team-name">
          {{ teamName }}
          <t-tag variant="light-outline" size="small" theme="danger">加密</t-tag>
        </span>
        <span class="team-description">{{ teamDescription }}</span>
        <span class="team-members">
          <t-icon size="14px" name="usergroup"></t-icon>
          {{ 1 }}/{{ 5 }}
        </span>
        <span class="team-timestamp">
          <t-icon size="14px" name="time"></t-icon> {{ deadline }}
        </span>
      </div>
    </div>
    <t-button size="extra-small" class="join-button">加入队伍</t-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teamImage: 'src/assets/成龙攻沙.png',
      teamName: '精英战队',
      teamDescription: '今晚一起来攻沙',
      teamStatus: '加密',
      createdAt: '2023-04-01',
      deadline: '2023-12-31'
    }
  }
}
</script>

<style lang="less" scoped>
.team-card {
  background: linear-gradient(-45deg, #e7e7ee, #96baea);
  height: 140px;
  width: 95vw;
  margin: 12px auto;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  .card-content {
    flex: 1;
    display: flex;
    align-items: center;
    .team-image {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      margin-right: 14px;
    }

    .team-info {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      .team-name {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .team-description {
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
        flex: 1;
      }

      .team-members {
        font-size: 12px;
        color: #999;
        line-height: 14px;
        .t-icon {
          vertical-align: bottom;
          line-height: 14px;
        }
      }

      .team-timestamp {
        font-size: 12px;
        color: #999;
        line-height: 14px;
        margin-top: 8px;
        .t-icon {
          vertical-align: bottom;
          line-height: 14px;
        }
      }
    }
  }

  .join-button {
    align-self: end;
    margin-left: 20px;
    background-color: #1890ff;
    color: #fff;
    border-radius: 5px;
  }
}
</style>
